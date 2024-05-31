const moment = require("moment");

const msgDetails = (user, msg, activeUsers) => {
  return {
    user,
    msg,
    activeUsers,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
