const express = require('express');
const config = require('./config/config');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes.js');
const passportSetup = require('./config/passport-setup');
// eslint-disable-next-line node/no-unpublished-require
const keys = require('./config/keys.js');

const app = express();

app.set("view engine", "ejs");


mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true})
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));


app.use('/auth', authRoutes);

app.get('/', function (req, res) {
  res.render("index", {})
});

app.listen(config.PORT, console.log(`Server started on port ${config.PORT}`));