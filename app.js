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
let letters = {};

const correctValues = {
  1: "a",
  2: "a",
  3: "a",
  4: "a",
  5: "a",
  6: "a",
  7: "a",
  8: "a",
  9: "a",
  10: "a",
  11: "a",
  12: "a",
  13: "a",
  14: "a",
  15: "a",
  16: "a",
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/crossword.html"));
});

io.on("connection", (socket) => {
  console.log("Socket.IO console connected!");
  socket.on("cell change", (data) => {
    io.emit("change cell", data);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
