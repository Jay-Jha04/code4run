const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const { User, userValidation } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username
  });

  User.register(user, req.body.password, function(err, user) {
    if (err) {
      return res.render('landing');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/api/code4run');
    });
  });
});

module.exports = router;
