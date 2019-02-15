// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
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

  client.close();
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

// Declare a route
fastify.get("/", async (request, reply) => {
  reply.send("Fastify root context working..");
});

fastify.get("/country", (request, reply) => {
  const collection = db.collection("country");
  query = {};
  collection.find(query).toArray((error, docs) => {
    if (error) {
      reply.status(400).send({ statusCode: 400, error: "", message: error });
    } else {
      reply.send(docs);
    }
  });
});
