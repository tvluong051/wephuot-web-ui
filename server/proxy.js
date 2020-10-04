/**
 * This module can be used to set up reverse proxying from client to Predix services or custom backend microservices.
 */

'use strict';

const url = require('url');
const express = require('express');
const expressProxy = require('express-http-proxy');
const config = require('./server-config').getServerConfig();
const router = express.Router(); // eslint-disable-line new-cap
const moment = require('moment');
const logger = require('./logger').logger;
const got = require('got');
const fs = require('fs');
const path = require('path');

// Constants
const HTTP_FORBIDDEN_STATUS = 403;
const HTTP_OK_STATUS = 200;
const CERTIFICATE_FOLDER = config.certificateFolder;
const CERTIFICATE_FILE = config.certificateFile;
const CERTIFICATE_KEY = config.certificateKey;
const CERTIFICATE_CA_FILE = config.certificateCaFile;
const CERTIFICATE_CA_FULL_FILE = config.certificateCaFullFile;

/* ********* Define Services Routes ********* */

function cleanResponseHeaders(proxyRes, proxyResData, userReq, userRes) {
  userRes.removeHeader('Access-Control-Allow-Origin');
  return proxyResData;
}

function buildDecorator(headers) {
  return function (proxyReqOpts) {
    if (!proxyReqOpts.headers['content-type'] || proxyReqOpts.headers['content-type'].match(/text\/plain/i)) {
      logger.info(`Content-Type header not set for request to ${proxyReqOpts.path}`);
    }

    if (headers) {
      headers.forEach(function (header) {
        proxyReqOpts.headers[header[0]] = header[1];
      });
    }
    return proxyReqOpts;
  };
}

function buildPathCalculator(endpoint) {
  return function (req) {
    let proxyPath = url.parse(endpoint).path;
    let reqPath = url.parse(req.url).path;

    // Build a new path with partial path from proxy endpoint and partial path from req
    if (proxyPath.endsWith('/')) {
      proxyPath = proxyPath.substring(0, proxyPath.length - 1);
    }
    if (reqPath.startsWith('/')) {
      reqPath = reqPath.substring(1, reqPath.length);
    }
    return proxyPath + '/' + reqPath;
  };
}

function setProxyRoute(key, serviceConfig) {
  let decorator;
  let pathCalculator;

  if (serviceConfig.endpoint) {
    logger.info(`setting proxy route for api key: ${key} => ${serviceConfig.endpoint}`);

    decorator = buildDecorator(serviceConfig.headers);
    pathCalculator = buildPathCalculator(serviceConfig.endpoint);

    router.use('/' + key, expressProxy(serviceConfig.endpoint, {
      userResDecorator: cleanResponseHeaders,
      proxyReqOptDecorator: decorator,
      proxyReqPathResolver: pathCalculator
    }));
  } else {
    logger.error(`No endpoint found for service ${key}`);
  }
}

// Create routes for each Predix service registered in config.proxy
function setProxyRoutes() {
  Object.keys(config.proxy).forEach(function (key) {
    setProxyRoute(key, config.proxy[key]);
  });
}

function getClientToken(socialTokens) {
  let qs = {};
  if (socialTokens) {
    if (socialTokens.facebookAccessToken) {
      qs = {
        tokenProvider: 'facebook',
        token: socialTokens.facebookAccessToken
      };
    }
  }
  return (async () => {
    try {
      const body = await got(config.proxy.user.endpoint + '/token', {
        searchParams: qs,
        https: {
          key: fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_KEY)),
          ca: [
            fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_CA_FILE)),
            fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_CA_FULL_FILE))        
          ],
          certificate: fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_FILE))
        }
      }).json();
    
      return body;
    } catch (err) {
      logger.error( "ERROR fetching client token: code " + err.statusCode + " - " + err.body);
    }
  })();
}

/* ********* Add Token Middleware ********* */

function addClientTokenMiddleware(req, res, next) {
  if (!req.session) {
    logger.error('No session found!');
    res.status(HTTP_FORBIDDEN_STATUS).send('Forbidden');
  }
  if (req.session.authorizationHeader &&
    moment(req.session.clientTokenExpires).isAfter(moment())) {
    logger.info('Token found!');
    req.headers.Authorization = req.session.authorizationHeader;
    next();
  } else {
      logger.info('Toekn not found or expired. Requesting new one ...');
      getClientToken(req.session.passport.user.tokens)
          .then(token => {
              req.session.authorizationHeader = 'Bearer ' + token.accessToken;
              req.session.clientTokenExpires = token.expiresTokenTs;
              req.headers.Authorization = req.session.authorizationHeader;
              next();
          })
          .catch(function (errorString) {
              res.status(HTTP_SERVER_ERROR).send(errorString);
          });
  }

}

router.use('/', addClientTokenMiddleware);

setProxyRoutes();

module.exports = {
  router: router,
  addClientTokenMiddleware: addClientTokenMiddleware
};
