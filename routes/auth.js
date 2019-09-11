const mongoose = require('mongoose');
const passport = require('passport');
const { User } = require('../models/users');
const express = require('express');

const router = express.Router();

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/api/code4run',
    failureRedirect: '/api/code4run'
  }),
  (req, res) => {}
);

module.exports = router;
