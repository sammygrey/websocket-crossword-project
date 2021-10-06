module.exports = (io, socket, onlineUsers, channels) => {

  socket.on('new user', (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  })

}