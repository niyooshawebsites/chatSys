const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
const connection = require("./db/connection");
const singupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const msgDetails = require("./utils/msgDetails");
const {
  joinLoggedinUser,
  getCurrentUser,
  allLoggedinUsers,
} = require("./utils/users");

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

// creating server for socket.io
const server = http.createServer(app);

// set up socket io
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// client connection - start
io.on("connection", (socket) => {
  // when a new user connects
  socket.on("loggedinUser", (loggedinUsername) => {
    // sending a welcome message to the client

    socket.emit(
      "msgFromServer",
      msgDetails("Chat Karo", "Welcome to Chat Karo", allLoggedinUsers)
    );

    socket.broadcast.emit(
      "msgFromServer",
      msgDetails("Chat Karo", `${loggedinUsername} has joined the chat`)
    );

    // disconnection
    socket.on("disconnect", () => {
      io.emit(
        "msgFromServer",
        msgDetails("Chat Karo", `${loggedinUsername} has left the chat`)
      );
    });
  });

  // receing the message from the client
  socket.on("clientMsg", (clientMsg) => {
    // inserting the user in the logged in user array
    joinLoggedinUser(socket.id, clientMsg.username, clientMsg.text);
    io.emit("msgFromServer", msgDetails(clientMsg.username, clientMsg.text));
  });
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}, link: http://localhost:${PORT}`);
});
