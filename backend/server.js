const express = require('express');
const server = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Middleware to parse JSON and URL-encoded data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Import your routes
const routes = require('./routes/routes');

// Use the routes defined in routes.js
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
      // Connect the client to the server	(optional starting in v4.7)
      await mongoose.connect(process.env.CONNECTION_STRING);

      // Send a ping to confirm a successful connection
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
      console.log("connection not possible")
      // Ensures that the client will close when you finish/error
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
