const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors");
const connection = require("./db/connection");
const singupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");

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
  socket.broadcast.emit("msgFromServer", "A new user connected");

  // sending a welcome message to the client
  socket.emit("msgFromServer", "Welcome to Chat Karo");

  // receing the message from the client
  socket.on("clientMsg", (clientMsg) => {
    io.emit("msgFromServer", clientMsg);
  });

  // disconnection
  socket.on("disconnect", () => {
    io.boardcast.emit("msgFromServer", "user left the chat");
  });
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}, link: http://localhost:${PORT}`);
});
