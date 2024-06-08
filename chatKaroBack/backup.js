// client connection - start
io.on("connection", (socket) => {
  // when a new user connects
  socket.on("loggedinUser", (loggedinUsername) => {
    // push the current loggedinUser in activeUser array
    pushActiveUsers(socket.id, loggedinUsername);

    // sending a welcome message to the client
    socket.emit(
      "msgFromServer",
      msgDetails("Chat Karo", "Welcome to Chat Karo", activeUsers)
    );

    socket.broadcast.emit(
      "msgFromServer",
      msgDetails(
        "Chat Karo",
        `${loggedinUsername} has joined the chat`,
        activeUsers
      )
    );

    // receive the message from the client
    socket.on("clientMsg", (clientMsg) => {
      io.emit(
        "msgFromServer",
        msgDetails(clientMsg.username, clientMsg.text, activeUsers)
      );
    });

    // disconnection
    socket.on("disconnect", () => {
      io.emit(
        "msgFromServer",
        msgDetails(
          "Chat Karo",
          `${loggedinUsername} has left the chat`,
          removeUsers(loggedinUsername)
        )
      );
    });
  });
});
