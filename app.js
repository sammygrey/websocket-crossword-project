//app.js
const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));

//Socket.io
const io = require("socket.io")(server);
let onlineUsers = {};

io.on("connection", (socket) => {
  require("./sockets/crossword.js")(io, socket, onlineUsers);
  console.log("connected")
});

app.get("/", (req, res) => {
  res.sendFile("public/crossword.html", { root: __dirname });
});

server.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
