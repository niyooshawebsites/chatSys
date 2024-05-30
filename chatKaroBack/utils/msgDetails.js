const moment = require("moment");

const msgDetails = (user, msg, onlineUsers) => {
  return {
    user,
    msg,
    time: moment().format("h:mm a"),
    onlineUsers,
  };
};

module.exports = msgDetails;
