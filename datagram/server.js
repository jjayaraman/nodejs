const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const SERVER_PORT = 1000;
let CLIENT_PORT;

server.bind(SERVER_PORT);

server.on('listening', () => {
    console.log('Server listening ...', server.address());
})

server.on('message', (msg, rinfo) => {
    CLIENT_PORT = rinfo.port
    console.log('Server got message -> ', msg.toString() + ' from ' + JSON.stringify(rinfo));
    server.send('Server acknowledgement', CLIENT_PORT)
})

server.on('error', (error) => {
    console.log('error -> ', error.toString());
})

server.on('close', () => {
    console.log('closing ...');
})

// Close server after 5 seconds
// setTimeout(() => {
//     console.log('timeout');
//     server.close();
// }, 5000);