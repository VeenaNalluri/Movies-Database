'use strict';

const express = require('express');

const service = require('../services/user');

const router = express.Router();

// // Creates New movie
router.get('/rating/:userId', (req, res) => {
  const result = service.getRating(req.params.userId);
  res.status(200);
  res.send(result);
});


// Authenticate User
router.post('/auth', (req, res) => {
  console.log('in auth', req.body)
  const isAuthenticated = service.authenticate(req.body);
  if (isAuthenticated) {
    res.status(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({"message": "successful login"});
  }
  else {
    res.status(401);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({"message": "login failed"});
  }
});
module.exports = router;
