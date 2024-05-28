const moment = require("moment");

const msgDetails = (msg) => {
  return {
    msg,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
