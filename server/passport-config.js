/*
 This module setups the Passport strategy for Predix
 */

'use strict';

const config = require('./server-config').getServerConfig();
const passport = require('passport');
const request = require('request-promise');
const FacebookStrategy = require('passport-facebook').Strategy;
let fbStrategy;

const HTTP_UNAUTHORIZED = 401;

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
    clientID: '494140187770420',
    clientSecret: '25dd6c56e7c62f7213f59f79d4507026',
    callbackURL: config.auth.callbackUrl,
    profileFields: ['id', 'name', 'displayName', 'emails', 'picture.type(large)']
  }, (accessToken, refreshToken, profile, done) => {

    request({
      method: 'POST',
      uri: config.proxy.user.endpoint + '/persons/person',
      headers: {
        "Content-Type": "application/json"
      },
      body: {
          provider: 'facebook',
          providedId: profile.id,
          displayName: profile.displayName,
          emails: profile.emails.map(email => email.value),
          profilePicture: profile.photos[0].value
      },
      json: true
    })
    .then(user => {
      const userSession = {
        user: user,
        tokens: {
          facebookAccessToken: accessToken
        }
      };
      done(null, userSession);
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
    
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
        res.redirect(config.auth.loginUrl);
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
