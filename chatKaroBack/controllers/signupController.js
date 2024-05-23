const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    // getting details from the body
    const { username, userEmail, userPassword } = req.body;

    //   if the details are not filled
    if (!username || !userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        msg: "Please fill out all the details",
      });
    } else {
      // if the details are filled
      // check if the user already exists........
      const existingUser = await userModel.findOne({ userEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          msg: "User already exists. Please login in",
        });
      } else {
        // creating new user in the database........

        // hashing the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(userPassword, salt);
        const newUser = new userModel({
          username,
          userEmail,
          userPassword: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({
          success: true,
          msg: "Signup successful",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = signupController;
