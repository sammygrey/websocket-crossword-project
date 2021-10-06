

//app.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};

io.on("connection", (socket) => {
    // Make sure to send the channels to our chat file
    require('./sockets/crossword.js')(io, socket, onlineUsers);


    server.listen('3000', () => {
        console.log('Server listening on Port 3000');
  });
});
  
  