//app.js
const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 3000;

//Socket.io
const io = require("socket.io")(server);
let onlineUsers = {};

io.on("connection", (socket) => {
  require("./sockets/crossword.js")(io, socket, onlineUsers);
});

app.get("/", (req, res) => {
  res.render("crossword.html");
});

server.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
