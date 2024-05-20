const mongoose = require("mongoose");

const connection = () => {
  try {
    const connect = mongoose.connect(process.env.CONN_STRING);
    connect
      ? console.log(`Connection Established`)
      : console.log(`Connection failed`);
  } catch (error) {
    console.log(`Connection error : ${error}`);
  }
};

module.exports = connection;
