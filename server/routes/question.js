const express = require('express');
const Question = require('../models/question');
const router = express.Router();

router
  .post('/addQuestion', async (req, res) => {
    try {
      const addQuestion = await Question.addQuestion(req.body.q_content, req.body.user_id);
      res.send(addQuestion);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .delete('/deleteQuestion', async (req, res) => {
    try {
      await Question.deleteQuestion(req.body.question_id);
      res.send({success: "We'll miss you...:("});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  module.exports = router;