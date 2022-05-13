const express = require('express');
const Question = require('../models/question');
const router = express.Router();

router
.get('/', async (req, res) => {
  try {
    const questions = await Question.getQuestion();
    res.send(questions);
  } catch(err) {
    res.status(401).send({message: err.message});
  }
})


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
      await Question.deleteQuestion(req.body.q_content);
      res.send({success: "We'll miss you...:("});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .put('/editQuestion', async (req, res) => {
    try {
      const editQuestion = await Question.editQuestion(req.body);
      console.log(editQuestion)
      res.send({...question, q_content: undefined});
    } catch(error) {
      res.status(401).send({message: error.message})
    }
  })



  module.exports = router;