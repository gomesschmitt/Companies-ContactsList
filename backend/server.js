var express = require('express');
var server = express();
var mongoose = require('mongoose');
var routes = require('./routes/routes');
const cors = require('cors');

mongoose.connect("mongodb://rschmitt:Wolf123456@cluster0.7b4yqhu.mongodb.net/companies")
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    console.error("DB CONNECTION ERROR:", error);
  });

server.use(routes);
server.use(cors());

server.get("/", (req, res) =>{
    res.send("Hello there");
})

server.listen(8000, function check(error) {
  if (error) {
    console.log("Error starting server:", error);
  } else {
    console.log("Server started on port 8000");
  }
});
