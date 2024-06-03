const userModel = require("../models/userModel");
const verificationModel = require("../models/verificationModel");
const bcrypt = require("bcrypt");
const generateOtp = require("../utils/email");

const signupController = async (req, res) => {
  try {
    // getting details from the body
    const { username, userEmail, userPassword } = req.body;

    //   if the details are not filled
    if (!username || !userEmail || !userPassword) {
      return res.status(400).send({
        success: false,
        msg: "Please fill out all the details",
      });
    } else {
      // if the details are filled

      // check if the user already exists........
      const existingUserByEmail = await userModel.findOne({ userEmail });
      const existingUserByUsername = await userModel.findOne({ username });

      if (existingUserByEmail || existingUserByUsername) {
        return res.status(400).send({
          success: false,
          msg: "User already exists. Please login in",
        });
      } else {
        // creating new user in the database........

        // hashing the password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // creating a new user
        const newUser = new userModel({
          username,
          userEmail,
          userPassword: hashedPassword,
        });

        // generate OTP for verification
        const OTP = generateOtp();

        const newUnverifiedUser = new verificationModel({
          ownwer: newUser._id,
          otp: OTP,
        });

        // saving the new user in the database
        await newUser.save();

        // saving the new unverfied user in the database
        await newUnverifiedUser.save();

        return res.status(200).send({
          success: true,
          msg: "Signup successful",
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Server error", err });
  }
};

module.exports = signupController;
