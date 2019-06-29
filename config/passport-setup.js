const passport = require('passport');
const VkontakteStrategy = require('passport-vkontakte').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// eslint-disable-next-line node/no-unpublished-require
const keys = require('./keys');
const User = require('../models/User');

passport.use(
  new VkontakteStrategy( {
    clientID: keys.vk.clientID,
    clientSecret: keys.vk.clientSecret,
    callbackURL:  'http://localhost:3000/auth/vk/redirect'
  }, (accessToken, refreshToken, params, profile, done) => {
    User.findOne({ providerID: profile.id }).then((currentUser) => {
      if (currentUser) {
        console.log('currentUser: ' + currentUser);
      } else {
        new User({
          providerID: profile.id,
          name: profile._json.first_name,
          surname: profile._json.last_name
        }).save()
          .then((newUser) => {
            console.log('new user created: ' + newUser);
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
    console.log(params);
    console.log(accessToken);
    console.log(refreshToken);
  }
));