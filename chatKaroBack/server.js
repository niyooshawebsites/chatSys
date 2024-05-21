const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors");
const connection = require("./db/connection");

// dotenv configuration......
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

// start the connection
connection();

// express server.......
const app = express();

// cors middleware
app.use(cors());

// get json from body
app.use(express.json());

// creating server for socket.io
const server = http.createServer(app);

// set up socket io
const io = socketio(server);

// client connection - start
io.on("connection", (socket) => {
  console.log("New connection established!");
});

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}, link: http://localhost:${PORT}`);
});
