const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");
const verificationModel = require("../models/verificationModel");
const bcrypt = require("bcrypt");

const verifyEmailController = async (req, res) => {
  try {
    // getting opt and owner from the body
    const { otp, owner } = req.body;
    // check if the
    if (!otp || !owner) {
      return res.status(400).json({
        success: false,
        message: "No OTP or User ID",
      });
    } else if (!isValidObjectId(owner)) {
      return res.status(404).json({
        success: false,
        message: `Invalid User ID`,
      });
    } else if (isValidObjectId(owner)) {
      // find the user from the database
      const user = await userModel.findOne({ _id: owner });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found`,
        });
      } else if (user) {
        // Getting the verification Token Object from the database
        const verificationTokenObject = await verificationModel.findOne({
          owner: owner,
        });
        if (!verificationTokenObject) {
          return res.status(404).json({
            success: false,
            message: `Token not found`,
          });
        } else {
          const isMatched = bcrypt.compare(otp, verificationTokenObject.otp);
          if (isMatched) {
            user.isVerified = true;
            await verificationModel.findByIdAndDelete({
              owner: owner,
            });

            return res.status(200).json({
              success: true,
              message: "Email verified successfully!",
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "Invalid OTP",
            });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyEmailController;
