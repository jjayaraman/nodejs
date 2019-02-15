const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();
const assert = require("assert");

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const MONGO_DB_DATABASE = process.env.MONGO_DB_DATABASE;

const client = new MongoClient(MONGO_DB_URL);
let db;

// Connects to MongoDB
client.connect(err => {
  assert.equal(null, err);
  if (err) {
    console.error("MongoDB error : ", error);
  }
  console.log("Connected successfully to MongoDB server");

  db = client.db(MONGO_DB_DATABASE);

  //  client.close();
});

// Declare a route
module.exports = (fastify, options, next) => {
  fastify.get("/", async (request, reply) => {
    reply.send("Fastify API working..");
  });

  fastify.get("/country", (request, reply) => {
    const collection = db.collection("country");
    query = {};
    collection.find(query).toArray((error, docs) => {
      if (error) {
        console.error("Error : ", error);
        reply.status(400).send({ statusCode: 400, error: "", message: error });
      } else {
        reply.send(docs);
      }
    });
  });

  fastify.get("/country_view", (request, reply) => {
    const collection = db.collection("country_view");
    query = {};
    collection.find(query).toArray((error, docs) => {
      if (error) {
        console.error("Error : ", error);
        reply.status(400).send({ statusCode: 400, error: "", message: error });
      } else {
        reply.send(docs);
      }
    });
    console.log("done");
  });

  next();
};
