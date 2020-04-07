const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


http.listen('3000', () => {
    console.log('Server started and listening...');
})


io.on('connection', (socket) => {
    console.log('io connected...');

    socket.on('disconnect', () => {
        console.log('client disconnected..')
    })

    socket.on('join', (data) => {
        console.log('client msg to server ..' + data);
    })

})