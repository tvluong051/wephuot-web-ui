'use strict';

const url = require('url');
let serverConfig;
const config = require('./environments/environment.json');
const authUrls = {
  facebook: {
    loginUrl: '/signin/facebook',
    callbackUrl: '/signin/facebook/callback'
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

  // Detect environment
  const providerId = process.env.idProvider || config.provider || 'facebook';

  serverConfig.provider = providerId;
  serverConfig.auth.loginUrl = authUrls[providerId].loginUrl;
  serverConfig.auth.callbackUrl = authUrls[providerId].callbackUrl;

  config.services.forEach(service => {
    const uri = url.parse(service.uri);

    serverConfig.proxy[service.name] = {
      endpoint:  service.uri
    };
  });

  console.log("****************** " + nodeEnv + " ******************");
  console.log("SERVER CONFIG:");
  console.log(JSON.stringify(serverConfig, null, "\t"));

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
