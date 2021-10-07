//app.js
const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));

//Socket.io
const io = require("socket.io")(server);
let onlineUsers = {};
let letters = {};

io.on("connection", (socket, cell) => {
  require("./sockets/crossword.js")(io, socket, onlineUsers, cell);
  console.log(cell);
});

app.get("/", (req, res) => {
  res.sendFile("public/crossword.html", { root: __dirname });
});

server.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
