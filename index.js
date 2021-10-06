$(document).ready(()=>{
    const socket = io.connect();
    let currentUser;
    socket.emit('get online users');

//here we put the socket for inputing letters
$(document).on('click', '.cell', (e)=>{
    let newLetter = e.target.textContent;
    socket.emit('user changed channel', newLetter);
  });


  //socket listeners
  socket.on('new letter', (data) => {
    //Only append the message if the user is currently in that channel
    let currentCell = $('.cell').text();
    if(currentCell) {
      $('.message-container').append(`
        <div class="message">
          <p class="message-text">${data.message}</p>
        </div>
      `);
    }
  });
})