/*
 This module setups the Passport strategy for Predix
 */

'use strict';

const config = require('./server-config').getServerConfig();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const logger = require('./logger').logger;
const got = require('got');
const fs = require('fs');
const path = require('path');

let fbStrategy;

const HTTP_UNAUTHORIZED = 401;
const CERTIFICATE_FOLDER = config.certificateFolder;
const CERTIFICATE_FILE = config.certificateFile;
const CERTIFICATE_KEY = config.certificateKey;
const CERTIFICATE_CA_FILE = config.certificateCaFile;
const CERTIFICATE_CA_FULL_FILE = config.certificateCaFullFile;

function configurePassportStrategy() {
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete CloudFoundry profile is
  //   serialized and deserialized.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  fbStrategy = new FacebookStrategy({
    clientID: config.auth.credentials.clientId,
    clientSecret: config.auth.credentials.clientSecret,
    callbackURL: config.auth.callbackUrl,
    profileFields: ['id', 'name', 'displayName', 'emails', 'picture.type(large)']
  }, (accessToken, refreshToken, profile, done) => {

    (async () => {
      try {
        const user = await got.post(config.proxy.user.endpoint + '/persons/person', {
          https: {
            key: fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_KEY)),
            ca: [
              fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_CA_FILE)),
              fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_CA_FULL_FILE))
            ],
            certificate: fs.readFileSync(path.join(CERTIFICATE_FOLDER, CERTIFICATE_FILE))
          },
          json: {
            provider: 'facebook',
            providedId: profile.id,
            displayName: profile.displayName,
            emails: profile.emails.map(email => email.value),
            profilePicture: profile.photos[0].value
          }
        }).json();
    
        const userSession = {
          user: user,
          tokens: {
            facebookAccessToken: accessToken
          }
        };
        
        done(null, userSession);
      } catch (err) {
        logger.error(err);
        done(err);
      }
    })();
    
  });

  passport.use(fbStrategy);
  return passport;
}

function authenticate(options) {
  return (req, res, next) => {
    function fail() {
      if (options && options.noRedirect) {
        res.sendStatus(HTTP_UNAUTHORIZED);
      } else {
        res.status(HTTP_UNAUTHORIZED)
        res.send({
          redirectUrl: '/login'
        });
      }
    }
    if (req.isAuthenticated()) {
      next();
    } else {
      fail();
    }
  };
}

module.exports = {
  configurePassportStrategy: configurePassportStrategy,
  authenticate: authenticate
};
