const onlineUsersModel = require("../models/onlineUsersModel");

const deleteOnlineUserController = async (req, res) => {
  try {
    const name = req.params.name;
    const result = await onlineUsersModel.findOneAndDelete({ name });
    if (result) {
      res.status(200).json({
        success: true,
        msg: "Online user deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "online user deletion failed",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteOnlineUserController;
