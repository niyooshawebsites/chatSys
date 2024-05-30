const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  // getting details from the body
  const { username, userPassword } = req.body;

  //   if the details are not filled
  if (!username || !userPassword) {
    return res.status(400).send({
      success: false,
      message: "Please fill all the details",
    });
  } else {
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Username or Password is incorrect",
      });
    } else {
      const unhashedPassword = await bcrypt.compare(
        userPassword,
        existingUser.userPassword
      );

      if (!unhashedPassword) {
        return res.status(404).send({
          success: false,
          message: "Username or Password is incorrect",
        });
      } else {
        const token = jwt.sign({ existingUser }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).send({
          success: true,
          message: "Login successful",
          token,
        });
      }
    }
  }
};

module.exports = loginController;
