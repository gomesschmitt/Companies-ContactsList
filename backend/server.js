const express = require('express');
const server = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

const routes = require('./routes/routes');

server.use('/', routes);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));



/*const { MongoClient, ServerApiVersion } = require('mongodb');


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
*/

  async function run() {
    try {
      await mongoose.connect(process.env.CONNECTION_STRING);

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
      console.log("connection not possible")
    }
  }
  run().catch(console.dir);

server.listen(process.env.DB_PORT, function check(error) {
  if (error) {
    console.log("Error starting server:", error);
  } else {
    console.log("Server started on port " + process.env.DB_PORT);
  }
});
