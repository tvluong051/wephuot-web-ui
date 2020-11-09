'use strict';

const path = require('path');
const express = require('express');
// Provide middleware to set various security header
const helmet = require('helmet');
// Used for session cookie
const cookieParser = require('cookie-parser');
// Simple in-memory session is used here. use connect-redis for production!!
const session = require('express-session');
// Used to send gziped files
const compression = require('compression');
// Configure passport for authentication with UAA
const passportConfig = require('./passport-config');
// proxy
const proxy = require('./proxy');
// ACS middleware
const RedisStore = require('connect-redis')(session);
// Only used if you have configured properties for UAA
let passport;
let mainAuthenticate = options => passportConfig.authenticate(options);

// Http(s) server
let http = require('http');
let https = require('https');
const logger = require('./logger').logger;

const fs = require('fs');
const serverConfig = require('./server-config').getServerConfig();

const PORT = serverConfig.port;
const PORT_TLS = serverConfig.portTls;
const STATIC_FILE_PATH = serverConfig.staticFilePath;
const CERTIFICATE_FOLDER = serverConfig.certificateFolder;
const CERTIFICATE_FILE = serverConfig.certificateFile;
const CERTIFICATE_KEY = serverConfig.certificateKey;
const CERTIFICATE_CA_FILE = serverConfig.certificateCaFile;
const CERTIFICATE_CA_FULL_FILE = serverConfig.certificateCaFullFile;

const HTTP_INTERNAL_ERROR_STATUS = 500;
// Express server
const app = express();

/**********************************************************************
 SETTING UP EXPRESS SERVER
 ***********************************************************************/

app.use(helmet());
app.set('trust proxy', 1);
app.use(cookieParser('ourphuot'));
app.use(compression());

const redisStore = new RedisStore({
  host: serverConfig.redisHost,
  port: serverConfig.redisPort,
  logErrors: function () {
    logger.error('Redis connection not found.');
    throw 'Redis connection not found.';
  }
});

app.use(session({
  store: redisStore,
  secret: 'wephuot',
  name: 'wephuot',
  proxy: true,
  resave: false,
  saveUninitialized: true,
  unset: 'destroy'
}));

passport = passportConfig.configurePassportStrategy();
app.use(passport.initialize());
// Also use passport.session() middleware, to support persistent login sessions (recommended).
app.use(passport.session());

http.createServer(app).listen(PORT, () => logger.info(`Server is listening on: ${PORT}`));
https.createServer({
  cert: fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_FILE)),
  ca: [
    fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_CA_FILE)),
    fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_CA_FULL_FILE))
  ],
  key: fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_KEY))
}, app).listen(PORT_TLS, () => logger.info(`Server is listening securely on: ${PORT_TLS}`));

app.use ((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect(`https://${req.hostname}${req.url}`);
  }
});

/****************************************************************************
 SET UP EXPRESS ROUTES
 *****************************************************************************/

app.get(serverConfig.auth.loginUrl, passport.authenticate(serverConfig.provider, {
  scope: ['email', 'user_friends'],
}));

  // Callback route redirects to secure route after login
app.get(serverConfig.auth.callbackUrl, passport.authenticate(serverConfig.provider, {
  successRedirect: '/',
  failureRedirect: serverConfig.auth.loginUrl,
  callbackURL: serverConfig.auth.callbackUrl
}));

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

app.get('/userinfo', mainAuthenticate(), (req, res) => {
  res.send(req.user.user);
});
app.use('/api', mainAuthenticate({noRedirect: true}), proxy.router);

const DIST_FOLDER = path.join(process.cwd(), 'public');

app.use(express.static(DIST_FOLDER));
app.use('/staticFile', mainAuthenticate(), express.static(STATIC_FILE_PATH));

app.use('/', (req, res) => res.sendFile(path.join(DIST_FOLDER, 'index.html')));

/****************************************************************************
 ERROR HANDLERS
 *****************************************************************************/
// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) { // eslint-disable-line no-unused-vars
  if (!res.headersSent) {
    res.status(err.status || HTTP_INTERNAL_ERROR_STATUS);
    res.send({
      message: err.message,
      error: {}
    });
  }
});

module.exports = app;
