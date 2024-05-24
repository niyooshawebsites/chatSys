const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  // getting details from the body
  const { username, userPassword } = req.body;

  //   if the details are not filled
  if (!username || !userPassword) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the details",
    });
  } else {
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Username or Password is incorrect",
      });
    } else {
      const unhashedPassword = await bcrypt.compare(
        userPassword,
        existingUser.userPassword
      );

      if (!unhashedPassword) {
        return res.status(404).json({
          success: false,
          message: "Username or Password is incorrect",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Login successful",
        });
      }
    }
  }
};

module.exports = loginController;
