const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.send(users);
  } catch(error) {
    res.status(401).send({message: error.message});
  }
})

.post('/login', async (req, res) => {
    try {
      const user = await User.login(req.body.username, req.body.password);
      res.send({...user, password: undefined});
    } catch (error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/register', async (req, res) => {
    try {
      const user = await User.register(req.body);
      res.send({...user, password: undefined})
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      User.deleteUser(req.body.userId);
      res.send({success: "We'll miss you...:("});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })


module.exports = router;