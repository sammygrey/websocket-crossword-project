$(document).ready(() => {
  const socket = io.connect();
  let currentUser;
  socket.emit("get online users");
  socket.emit("show all channels");

  $(document).on("click", "cell", (e) => {
    let cellLetter = e.target.textContent;
    socket.emit("user changed channel", cellLetter);
    console.log("im in the document index");
  });
});
