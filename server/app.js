var express = require('express');
const bodyParser = require("body-parser");
var path = require('path')
// const cors = require("cors"); 
var app = express();

// app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application........." });
// });

app.use('/api', require('./routes/index'))

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// app.get('/', function(req, res){
//    res.send("Hello world!");
// });

// app.listen(3030);