const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const CLIENT_PORT = 1000;

client.send('Client says hello server' , CLIENT_PORT);

client.on('listening', ()=> {
    console.log('client listening ...', client.address());
})

client.on('message', (msg, rinfo) => {
    console.log('message -> ', msg.toString() +', rinfo : ' +JSON.stringify(rinfo));
})

client.on('error', (error) => {
    console.log('error -> ', error.toString());
})

client.on('close', () => {
    console.log('closing client...');
})

// Close client after 2 seconds
setTimeout(() => {
    console.log('timeout');
    client.close();
}, 2000);
//process.exit();
