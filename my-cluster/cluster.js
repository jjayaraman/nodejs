const http = require('http');
const cluster = require('cluster');
const os = require('os');

const numOfCpus =os.cpus().length;
//console.log(os.arch().toString());
console.log();
// console.log(os.hostname);
// console.log(os.platform);
// console.log(os.userInfo);
// console.log(os.uptime);
// console.log(os.type);
// console.log(os.totalmem);
// console.log(os.homedir);


if(cluster.isMaster) {
    console.log(cluster.isMaster);

//    cluster.fork();
}
else{

}

