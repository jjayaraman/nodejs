// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const helmet = require('fastify-helmet')

fastify.register(require("./route/mongo-api"), { prefix: "/api" });

fastify.register(helmet)

fastify.register(require("fastify-rate-limit"), {
  max: 3, // default 1000
  timeWindow: 5000, // default 1000 * 60
 // cache: 10000, // default 5000
  whitelist: ["127.0.0.1"], // default []
  //  redis: new Redis({ host: '127.0.0.1' }), // default null
  skipOnError: true, // default false
  keyGenerator: function(req) {
    return (
      req.headers["x-real-ip"] || // nginx
      req.headers["x-client-ip"] || // apache
      req.headers["x-forwarded-for"] || // use this only if you trust the header
      //req.session.username || // you can limit based on any session value
      req.ip
    ); // fallback to default
  }
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
