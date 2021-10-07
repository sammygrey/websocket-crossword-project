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

module.exports = (io, socket, onlineUsers) => {
  socket.on("cell", (data) => {
    console.log(Object.values(data)[0] == correctValues[Object.keys(data)[0]]);
  });

  socket.on("get online users", () => {
    //Send over the onlineUsers
    socket.emit("get online users", onlineUsers);
  });

  // This fires when a user closes out of the application
  // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
  socket.on("disconnect", () => {
    //This deletes the user by using the username we saved to the socket
    delete onlineUsers[socket.username];
    io.emit("user has left", onlineUsers);
  });
  socket.on("show channels", () => {
    socket.emit("show channels", channels);
  });
};
