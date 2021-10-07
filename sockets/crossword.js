module.exports = (io, socket, onlineUsers) => {
  socket.on("cell", (data) => {
    console.log(data);
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
