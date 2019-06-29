const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.send('todo: loggin out...');
});

router.get('/vk', passport.authenticate('vkontakte', {
  scope: ['profile', 'email']
}));

router.get('/vk/redirect', passport.authenticate('vkontakte'),(req, res) => {
  res.send('callback uri');
});

router.get('/facebook', passport.authenticate('facebook', {
  scope: ['profile', 'email']
}));

router.get('/facebook/redirect',  passport.authenticate('facebook'), (req, res) => {
  res.send('callback uri');
});

module.exports = router;