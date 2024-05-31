const moment = require("moment");

const msgDetails = (user, msg, onlineUsers) => {
  return {
    user,
    msg,
    onlineUsers,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
