//app.js
const express = require("express");
const app = express();
const path = require("path");
const server = require("http").Server(app);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));

//Socket.io
const io = require("socket.io")(server);
let onlineUsers = {};
let userLetters = {};

const correctValues = {
  1: "a",
  2: "g",
  3: "a",
  4: "r",
  5: "g",
  7: "s",
  8: "i",
  9: "a",
  10: "t",
  12: "n",
  13: "v",
  14: "o",
  15: "i",
  16: "d",
  17: "e",
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/crossword.html"));
});

io.on("connection", (socket) => {
  console.log("Socket.IO console connected!");
  socket.on("cell change", (data) => {
    userLetters[Object.keys(data)[0]] = Object.values(data)[0];
    io.emit("change cell", data);
    if (userLetters == correctValues) {
      io.emit("win");
    }
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
