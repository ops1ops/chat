const express = require('express');
const config = require('./config/config');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes.js');
const passportSetup = require('./config/passport-setup');
const chatRoute = require('./routes/chat');
// eslint-disable-next-line node/no-unpublished-require
const keys = require('./config/keys.js');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();
process.env.TZ = 'Europe/Minsk';


console.log(new Date());
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true})
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

app.use('/auth', authRoutes);
app.use('/chat', chatRoute);

app.get('/', (req, res) => {
  res.redirect('chat');
});

app.use(function(req, res, next){
  // the status option, or res.statusCode = 404
  // are equivalent, however with the option we
  // get the "status" local available as well
  res.render('404', { status: 404, url: req.url });
});

const server = app.listen(config.PORT, console.log(`Server started on port ${config.PORT}`));

require('./chat/chat')(server);