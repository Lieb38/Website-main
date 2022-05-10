const express = require('express');
const Question = require('../models/question');
const router = express.Router();

router
  .get('/', (req, res) => {
    try {
      const quest = Question.getAllQuestion();
      res.send(question);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  module.exports = router;