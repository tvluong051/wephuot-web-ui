'use strict';

const url = require('url');
let serverConfig;
const config = require('./environment.json');
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');
const logger = require('./logger').logger;
const authUrls = {
  facebook: {
    loginUrl: '/signin/facebook',
    callbackUrl: '/signin/facebook/callback',
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  },
  twitter: {

  }
}

function setServerConfig() {
  serverConfig = {
    auth: {},
    proxy: {}
  };

  // Application configuration
  const nodeEnv = config.environment;
  serverConfig.port = process.env.port || config.port;
  serverConfig.portTls = process.env.portTls || config.portTls;
  serverConfig.staticFilePath = process.env.STATIC_FILE_PATH || config.staticFilePath;
  serverConfig.certificateFolder = process.env.CERTIFICATE_FOLDER || config.certificateFolder;
  serverConfig.certificateFile = process.env.CERTIFICATE_FILE || config.certificateFile;
  serverConfig.certificateKey = process.env.CERTIFICATE_KEY || config.certificateKey;
  serverConfig.certificateCaFile = process.env.CERTIFICATE_CA_FILE || config.certificateCaFile;
  serverConfig.certificateCaFullFile = process.env.CERTIFICATE_CA_FULL_FILE || config.certificateCaFullFile;
  serverConfig.redisHost = process.env.REDIS_HOST || config.redisHost;
  serverConfig.redisPort = process.env.REDIS_PORT || config.redisPort;

  // Detect environment
  const providerId = process.env.idProvider || config.provider || 'facebook';

  serverConfig.provider = providerId;
  serverConfig.auth.loginUrl = authUrls[providerId].loginUrl;
  serverConfig.auth.callbackUrl = authUrls[providerId].callbackUrl;

  if (authUrls[providerId].clientId && authUrls[providerId].clientSecret) {
    serverConfig.auth.credentials = {
      clientId: authUrls[providerId].clientId,
      clientSecret: authUrls[providerId].clientSecret
    };
  } else {
    logger.error('Identity provider credentials not found');
    throw 'Identity provider credentials not found';
  }
  config.services.forEach(service => {
    const uri = url.parse(service.uri);

    serverConfig.proxy[service.name] = {
      endpoint:  service.uri
    };
  });


  logger.info("****************** " + nodeEnv + " ******************");
  logger.info("SERVER CONFIG:\n" + JSON.stringify(serverConfig, null, "\t"));

  return serverConfig;
}

function getServerConfig() {
  if (serverConfig) {
    return serverConfig;
  }
  return setServerConfig();
}

function resetServerConfig() {
  serverConfig = null;
}

module.exports = {
  getServerConfig: getServerConfig,
  resetServerConfig: resetServerConfig
};
