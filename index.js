const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./server/routes/user');
const questionRoutes = require('./server/routes/question');
const answerRoutes = require('./server/routes/answer');
const ratingRoutes = require('./server/routes/rating');

app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/home.html')))

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use("/users", userRoutes);
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/rating", ratingRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));