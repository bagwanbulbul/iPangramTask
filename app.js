const jwt = require('jsonwebtoken');
//const cors = require('cors')
const users = require("./routes/Signup_login");
const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const  mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose
  .connect('mongodb://localhost:127.0.0.1/iPangram', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the Database successfully');
  });

app.use('/', users)

app.listen(5000, ()=>{
    console.log("server is listning on port 5000")
});