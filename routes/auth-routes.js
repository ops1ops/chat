const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/chat');
  } else {
    res.render('login');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

router.get('/vk', passport.authenticate('vkontakte', {
  scope: ['profile', 'notify']
}));

router.get('/vk/redirect', passport.authenticate('vkontakte', { successRedirect: '/',
failureRedirect: '/login'  }), (req, res) => {
  res.redirect('/chat');
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email']
}));

router.get('/facebook/redirect',  passport.authenticate('facebook', { successRedirect: '/',
failureRedirect: '/login'  }), (req, res) => {
  res.redirect('/chat');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect',  passport.authenticate('google'), (req, res) => {
  res.redirect('/chat');
});

module.exports = router;