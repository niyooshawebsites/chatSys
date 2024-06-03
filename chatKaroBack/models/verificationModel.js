const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

const verificationModel = mongoose.model("verifyUsers", verificationSchema);

module.exports = verificationModel;
