const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('test' , 1000);
console.log('Disconnecting client...');

client.on('listening', ()=> {
    console.log('client listening ...');
})

client.on('message', (msg) => {
    console.log('message -> ', msg.toString());
})

client.on('error', (error) => {
    console.log('error -> ', error.toString());
})

client.on('close', () => {
    console.log('closing ...');
})

//process.exit();
