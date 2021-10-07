module.exports = (io, socket, onlineUsers, cellLetter) => {

    socket.on('cell', (cell) => {
        
        console.log(cell)
      })

    socket.on('get online users', () => {
        //Send over the onlineUsers
        socket.emit('get online users', onlineUsers);
    });
    
  // This fires when a user closes out of the application
  // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
    socket.on('disconnect', () => {
    //This deletes the user by using the username we saved to the socket
    delete onlineUsers[socket.username]
    io.emit('user has left', onlineUsers);
    });
    socket.on('show channels', () => {
      socket.emit('show channels', channels)
    })

    socket.on('cell change', (data) => {
        //Save the new message to the channel.
        console.log(data)
        channels[data.channel].push({sender : data.sender, message : data.message});
        //Emit only to sockets that are in that channel room.
        io.to(data.channel).emit('new message', data);
    });
    
  }