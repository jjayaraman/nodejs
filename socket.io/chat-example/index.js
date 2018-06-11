const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// Socket IO
io.on('connection', (socket) => {
    console.log('a user connected...');

    socket.on('chat event', (msg) => {
        console.log("client rcvd : " + msg);
        io.emit('server message', msg);
    })

    socket.on('disconnect', () => {
        console.log('a user dis-connected...');
    })
})

// Server
http.listen('3000', () => {
    console.log('Express server started and listening...');
})

