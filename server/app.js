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

const serverConfig = require("./server-config").getServerConfig();

const PORT = serverConfig.port;
const STATIC_FILE_PATH = serverConfig.staticFilePath;

const HTTP_INTERNAL_ERROR_STATUS = 500;
// Express server
const app = express();

/**********************************************************************
 SETTING UP EXPRESS SERVER
 ***********************************************************************/

app.use(helmet());
app.set('trust proxy', 1);
app.use(cookieParser('wephuot'));
app.use(compression());

const redisStore = new RedisStore({
  host: '127.0.0.1',
  port: 6379,
  logErrors: function () {
    console.error('Redis connection not found.');
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

app.listen(PORT, () => console.log('Server is listening on: ' + PORT));

/****************************************************************************
 SET UP EXPRESS ROUTES
 *****************************************************************************/

// Login route redirect to predix uaa login page

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

const DIST_FOLDER = path.join(process.cwd(), 'dist');

app.use(mainAuthenticate(), express.static(path.join(DIST_FOLDER, 'public')));
app.use('/staticFile', mainAuthenticate(), express.static(STATIC_FILE_PATH));

app.use('/', mainAuthenticate(), (req, res) => res.sendFile(path.join(DIST_FOLDER, '/public/index.html')));

/* app.get('/userinfo', (req, res) => {
  res.send({
    userId: '19e51650-f257-49e7-8bea-ddd3d70acc5f',
    profilePic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10209935378981344&height=200&width=200&ext=1549740314&hash=AeQjGYXdpNkprLHh',
    displayName: 'Luong Tuan Viet',
    email: 'tonami198990@yahoo.fr'
  });
});
app.use('/api', proxy.router);

const DIST_FOLDER = path.join(process.cwd(), 'dist');

app.use(express.static(path.join(DIST_FOLDER, 'public')));
app.use('/staticFile', express.static(STATIC_FILE_PATH));

app.use('/', (req, res) => res.sendFile(path.join(DIST_FOLDER, '/public/index.html'))); */

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
