const moment = require("moment");
const activeUsers = [];

const msgDetails = (user, msg) => {
  activeUsers.push(user);
  return {
    user,
    msg,
    time: moment().format("h:mm a"),
    activeUsers,
  };
};

module.exports = msgDetails;
