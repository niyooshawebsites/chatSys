const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

// dotenv configuration......
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

// express server.......
const app = express();

// setting up the static folder
console.log(path.join(__dirname, "chatkaro", "index.html"));
app.use(express.static(path.join(__dirname, "public")));

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
