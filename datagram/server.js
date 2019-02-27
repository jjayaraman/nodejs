const dgram = require('dgram');

const server = dgram.createSocket('udp4');
server.bind(1000);
server.close();

server.on('listening', ()=> {
    console.log('Server listening ...');
})

server.on('message', (msg) => {
    console.log('message -> ', msg.toString());
})

server.on('error', (error) => {
    console.log('error -> ', error.toString());
})

server.on('close', () => {
    console.log('closing ...');
})