const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  req.logout();
  res.redirect('/api/code4run');
});

module.exports = router;
