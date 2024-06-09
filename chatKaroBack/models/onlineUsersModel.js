const mongoose = require("mongoose");

const onlineUsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    socketId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const onlineUsersModel = mongoose.model("onlineUsers", onlineUsersSchema);
module.exports = onlineUsersModel;
