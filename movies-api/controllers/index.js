'use strict';

const express = require('express');
const router = express.Router();

router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

module.exports = router;
