const express = require('express');
const Answer = require('../models/answer');
const router = express.Router();

router
  .get ('/getAllanswers', async (req, res) => {
    try {
      const answers = await Answer.getAllAnswers();
      res.send(answers);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
})

  .get('/', async (req, res) => {
    try {
      const answers = await Answer.getAnswer();
      res.send(answers);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })


  .post('/addAnswer', async (req, res) => {
    try {
      const addAnswer = await Answer.addAnswer(req.body.a_content, req.body.user_id);
      res.send(addAnswer);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .delete('/deleteAnswer', async (req, res) => {
    try {
      await Answer.deleteAnswer(req.body.a_content);
      res.send({success: "We'll miss you...:("});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .put('/editAnswer', async (req, res) => {
    try {
      const editAnswer = await Answer.editAnswer(req.body);
      console.log(editAnswer)
      res.send({a_content: undefined});
    } catch(error) {
      res.status(401).send({message: error.message})
    }
  })




  module.exports = router;