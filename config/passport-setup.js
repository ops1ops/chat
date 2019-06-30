const passport = require('passport');
const VkontakteStrategy = require('passport-vkontakte').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// eslint-disable-next-line node/no-unpublished-require
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((User, done) => {
  done(null, User.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((User) => {
    done(null, User);
  });
});

passport.use(
  new VkontakteStrategy( {
    clientID: keys.vk.clientID,
    clientSecret: keys.vk.clientSecret,
    callbackURL:  `http://localhost:3000/auth/vk/redirect`
  }, (accessToken, refreshToken, params, profile, done) => {
    User.findOne({ providerID: profile.id }).then((currentUser) => {
      if (currentUser) {
        console.log('currentUser: ' + currentUser);
        done(null, currentUser);
      } else {
        console.log(profile);
        new User({
          providerID: profile.id,
          name: profile._json.first_name,
          surname: profile._json.last_name,
          provider: profile.provider
        }).save()
          .then((newUser) => {
            console.log('new user created: ' + newUser);
            done(null, newUser);
          }
        );
      }
    });
    
  }
));

passport.use(
  new FacebookStrategy( {
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL:  'http://localhost:3000/auth/facebook/redirect'
  }, (accessToken, refreshToken, params, profile, done) => {
    console.log(profile);
    console.log('params: ' + params);
  }
));

passport.use(
  new Google( {
    clientID: keys.vk.clientID,
    clientSecret: keys.vk.clientSecret,
    callbackURL:  `http://localhost:3000/auth/vk/redirect`
  }, (accessToken, refreshToken, params, profile, done) => {
    User.findOne({ providerID: profile.id }).then((currentUser) => {
      if (currentUser) {
        console.log('currentUser: ' + currentUser);
        done(null, currentUser);
      } else {
        console.log(profile);
        new User({
          providerID: profile.id,
          name: profile._json.first_name,
          surname: profile._json.last_name,
          provider: profile.provider
        }).save()
          .then((newUser) => {
            console.log('new user created: ' + newUser);
            done(null, newUser);
          }
        );
      }
    });
    
  }
));

