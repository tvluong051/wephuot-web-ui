/**
 * This module can be used to set up reverse proxying from client to Predix services or custom backend microservices.
 */

'use strict';

const url = require('url');
const express = require('express');
const expressProxy = require('express-http-proxy');
const HttpsProxyAgent = require('https-proxy-agent');
const config = require('./server-config').getServerConfig();
const router = express.Router(); // eslint-disable-line new-cap

const corporateProxyServer =
  process.env.http_proxy || process.env.HTTP_PROXY ||
  process.env.https_proxy || process.env.HTTPS_PROXY;

let corporateProxyAgent;

// Constants
const HTTP_FORBIDDEN_STATUS = 403;

// Corporate proxy
if (corporateProxyServer) {
  corporateProxyAgent = new HttpsProxyAgent(corporateProxyServer);
}

/* ********* Define Services Routes ********* */

function cleanResponseHeaders(proxyRes, proxyResData, userReq, userRes) {
  userRes.removeHeader('Access-Control-Allow-Origin');
  return proxyResData;
}

function buildDecorator(headers) {
  return function (proxyReqOpts) {
    if (corporateProxyAgent) {
      proxyReqOpts.agent = corporateProxyAgent;
    }

    if (!proxyReqOpts.headers['content-type'] || proxyReqOpts.headers['content-type'].match(/text\/plain/i)) {
      console.log('Content-Type header not set for request to ' +
        proxyReqOpts.path);
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
    console.log('setting proxy route for key: ' + key);
    console.log('serviceEndpoint: ' + serviceConfig.endpoint);

    decorator = buildDecorator(serviceConfig.headers);
    pathCalculator = buildPathCalculator(serviceConfig.endpoint);

    router.use('/' + key, expressProxy(serviceConfig.endpoint, {
      userResDecorator: cleanResponseHeaders,
      proxyReqOptDecorator: decorator,
      proxyReqPathResolver: pathCalculator
    }));
  } else {
    console.log('No endpoint found for service ' + key);
  }
}

// Create routes for each Predix service registered in config.proxy
function setProxyRoutes() {
  Object.keys(config.proxy).forEach(function (key) {
    setProxyRoute(key, config.proxy[key]);
  });
}


/* ********* Add Token Middleware ********* */

function addClientTokenMiddleware(req, res, next) {
  if (req.session) {
    next();
  } else {
    res.status(HTTP_FORBIDDEN_STATUS).send('Forbidden');
  }
}

router.use('/', addClientTokenMiddleware);

setProxyRoutes();

module.exports = {
  router: router,
  addClientTokenMiddleware: addClientTokenMiddleware
};
