const express = require('express');
const Answer = require('../models/answer');
const router = express.Router();

router
  .post('/addAnswer', async (req, res) => {
    try {
      const addAnswer = await Answer.addAnswer(req.body.a_content, req.body.user_id);
      res.send(addAnswer);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  module.exports = router;