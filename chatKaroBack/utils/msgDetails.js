const moment = require("moment");

const msgDetails = (user, msg, activeUser) => {
  return {
    user,
    msg,
    activeUser,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
