const moment = require("moment");

const msgDetails = (senderId, receiverId, user, receiver, msg) => {
  return {
    senderId,
    receiverId,
    user,
    receiver,
    msg,
    time: moment().format("h:mm a"),
  };
};

module.exports = msgDetails;
