const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ejs = require('ejs');
const config = require('config');
const code4run = require('./routes/code4run');
const users = require('./routes/users');
const { User } = require('./models/users');
const dashboard = require('./routes/dashboard');
const token = require('./middleware/token');
const auth = require('./routes/auth');
const logout = require('./routes/logout');

mongoose
  .connect('mongodb://localhost/Code4Run', { useNewUrlParser: true })
  .then(() => console.log('Connected to database.....'))
  .catch(err => console.error('Connection failed....', err));

const app = express();

app.use(
  require('express-session')({
    secret: config.get('privateKey'),
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(token);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/code4run', code4run);
app.use('/api/users', users);
app.use('/api/dashboard', dashboard);
app.use('/api/auth', auth);
app.use('/api/logout', logout);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}...`));
