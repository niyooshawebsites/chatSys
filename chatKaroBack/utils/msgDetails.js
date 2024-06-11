const moment = require("moment");

const msgDetails = (user, msg) => {
  return {
    user,
    msg,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
