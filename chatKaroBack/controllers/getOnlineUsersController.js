const onlineUsersModel = require("../models/onlineUsersModel");

const getOnlineUsersController = async (req, res) => {
  try {
    const allUsers = await onlineUsersModel.find({});
    if (!allUsers || allUsers.length <= 1) {
      res.status(404).json({
        success: false,
        message: "No online user",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Onliners",
        users: allUsers,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = getOnlineUsersController;
