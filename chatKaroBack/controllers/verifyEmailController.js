const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");
const verificationModel = require("../models/verificationModel");
const bcrypt = require("bcrypt");

const verifyEmailController = async (req, res) => {
  try {
    // getting opt and userID from the body
    const { otp, userId } = req.body;
    // check if the
    if (!otp || !userId) {
      return res.status(400).json({
        success: false,
        message: "No OTP or User ID",
      });
    } else if (!isValidObjectId(userId)) {
      return res.status(404).json({
        success: false,
        message: `Invalid User ID`,
      });
    } else if (userId) {
      // find the user from the database
      const user = await userModel.findOne({ userId });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      } else if (user) {
        // Getting the verification Token Object from the database
        const verificationTokenObject = await verificationModel.findOne({
          userId,
        });
        if (!verificationTokenObject) {
          return res.status(404).json({
            success: false,
            message: `Token not found`,
          });
        } else {
          user.isVarified = true;
          await verificationModel.findByIdAndDelete(userId);
          return res.status(200).json({
            success: true,
            message: "Email verified successfully!",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyEmailController;
