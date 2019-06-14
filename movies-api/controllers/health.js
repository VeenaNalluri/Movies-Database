'use strict';

const express = require('express');

const { id } = require('../config');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ id, status: 'OK' });
});

module.exports = router;
