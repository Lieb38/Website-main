const express = require('express');
const Rating = require('../models/rating');
const router = express.Router();

router

  .get('/', async (req, res) => {
    try {
      const ratings = await Rating.getAnswer();
      res.send(ratings);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })


  .post('/addRatingQ', async (req, res) => {
    try {
      const addRating = await Rating.addRating(req.body.rating, req.body.user_id, req.body.question_id);
      res.send(addRating);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/addRatingA', async (req, res) => {
    try {
      const addRating = await Rating.addRating(req.body.rating, req.body.user_id, req.body.answer_id);
      res.send(addRating);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })


  .put('/increaseRating', async (req, res) => {
    try {
      const increaseRating = await Rating.increaseRating(req.body);
      console.log(increaseRating)
      res.send({...rating, rating: undefined});
    } catch(error) {
      res.status(401).send({message: error.message})
    }
  })




  module.exports = router;