const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


$(document).ready(()=>{
    const socket = io.connect();
    let currentUser;
    socket.emit('get online users');
    console.log(currentUser)



app.get('/', (req, res) => {
  res.sendFile(__dirname + 'sockets/index.js');
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
  
})