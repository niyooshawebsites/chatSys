const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const connection = require("./db/connection");
const singupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const getOnlineUsersRoute = require("./routes/getOnlineUsersRoute");
// const onlineuserDeleteRoute = require("./routes/onlineUserDeleteRoute");
const verifyEmailPostRoute = require("./routes/verifyEmailRoute");
const msgDetails = require("./utils/msgDetails");

// dotenv configuration......
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

// start the connection
connection();

// express server.......
const app = express();

// cors middleware.....
app.use(cors());

// get json from body........
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// ROUTES
// signup route.......
app.use(process.env.BASE_URL, singupRoute);

// login route........
app.use(process.env.BASE_URL, loginRoute);

// verfiy email POST..........
app.use(process.env.BASE_URL, verifyEmailPostRoute);

// get all online users.........
app.use(process.env.BASE_URL, getOnlineUsersRoute);

// delete an online user.........
// app.use(process.env.BASE_URL, onlineuserDeleteRoute);

// creating server for socket.io
const server = http.createServer(app);

// set up socket io
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// socket.io
io.on("connection", (socket) => {
  // when a user connects....
  socket.on("loggedinUser", (loggedinUsername) => {
    // sending a welcome message to the client
    socket
      .to(loggedinUsername.id)
      .emit(
        "msgFromServer",
        msgDetails("Gup Shup", "Welcome to Chat Karo", activeUsers)
      );

    // when a new user joins the chat
    socket.broadcast.emit(
      "msgFromServer",
      msgDetails(
        "Gup Shup",
        `${loggedinUsername.username} has joined the chat`,
        activeUsers
      )
    );

    // receive the message from the client
    socket.on("clientMsg", (clientMsg) => {
      if (clientMsg.receiverId) {
        // send a copy to the sender
        io.to(clientMsg.senderId).emit(
          "msgFromServer",
          msgDetails(clientMsg.username, clientMsg.text, activeUsers)
        );
        // send a copy to the receiver
        io.to(clientMsg.receiverId).emit(
          "msgFromServer",
          msgDetails(clientMsg.username, clientMsg.text, activeUsers)
        );
      } else {
        io.emit(
          "msgFromServer",
          msgDetails(clientMsg.username, clientMsg.text, activeUsers)
        );
      }
    });

    // when a user disconnects....
    socket.on("disconnect", () => {
      io.emit(
        "msgFromServer",
        msgDetails(
          "Chat Karo",
          `${loggedinUsername.username} has left the chat`,
          removeUsers(loggedinUsername)
        )
      );
    });
  });
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}, link: http://localhost:${PORT}`);
});
