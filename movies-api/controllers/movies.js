'use strict';

const express = require('express');

const service = require('../services/movies');

const router = express.Router();

// // Creates New movie
router.post('/', (req, res) => {
  const result = service.create(req.body);
  res.status(201);
  res.send(result);
  // res.send(result);
});

router.get('/:movieId', (req, res) => {
  const result = service.getById(req.params.movieId);
  if (result === undefined) {
    res.status(404);
    res.send({ message: 'Movie ID Not Found' });
  }
  res.send(result);
});

router.get('/', (req, res) => {
    const result = service.get();
    res.send(result);
});

router.post('/:movieId', (req, res) => {
  req.body.movieId = req.params.movieId;
  const isUpdated = service.update(req.body);
  let message = 'Successful updated movie details';
  if (isUpdated) {
    res.send({ message, body: req.body });
  }
  else {
    message = 'Update Failed';
    res.send({ message, body: req.body });
  }
});

router.get('/delete/:movieId', (req, res) => {
  const result = service.deleteById(req.params.movieId);
  if (result) {
    res.send({ message: 'Movie deleted successfully' });
  }
  else {
    res.status(400);
    res.send({ message: 'Movie deletion failed' });
  }
});


module.exports = router;
