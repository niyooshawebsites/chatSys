const moment = require("moment");

const msgDetails = (user, receiver, msg) => {
  return {
    user,
    receiver,
    msg,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
