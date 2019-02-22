const http = require("http");
const cluster = require("cluster");
const os = require("os");

const numOfCpus = os.cpus().length;
//console.log(os.arch().toString());
console.log();
// console.log(os.hostname);
// console.log(os.platform);
// console.log(os.userInfo);
// console.log(os.uptime);
// console.log(os.type);
// console.log(os.totalmem);
// console.log(os.homedir);

if (cluster.isMaster) {
  console.log(`Master pid ${process.pid} is running.`);

  // Fork Workers
  for (let index = 1; index <= numOfCpus; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} finished.`);
  });
} else {
  http.createServer(3000, (req, res) => {
    res.write("started");
    res.end();
  });
  console.log(`Worker thread ${process.pid} started..`);
}
