require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./server/routes/user'); // edit to fix
// add routes to rest of entitities
app.use(express.json());//

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/public/home.html')));

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use("/users", userRoutes);

app.get('*', function (req, res) {  /// edit w/ new code on slide 19 // rest 2
  res.sendFile(path.resolve(__dirname, 'public', 'bmi.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));