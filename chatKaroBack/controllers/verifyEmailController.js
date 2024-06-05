const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");
const verificationModel = require("../models/verificationModel");
const bcrypt = require("bcrypt");

const verifyEmailController = async (req, res) => {
  try {
    const { otp, owner } = req.body;

    if (!otp || !owner) {
      return res.status(400).json({
        success: false,
        message: "No OTP or User ID",
      });
    }

    if (otp && owner) {
      if (!isValidObjectId(owner)) {
        return res.status(404).json({
          success: false,
          message: `Invalid User ID`,
        });
      } else if (isValidObjectId(owner)) {
        const verificationTokenObject = await verificationModel.findOne({
          owner,
        });

        if (!verificationTokenObject) {
          return res.status(404).json({
            success: false,
            message: `Token not found`,
          });
        } else if (verificationTokenObject) {
          const isTokenMatched = await bcrypt.compare(
            otp,
            verificationTokenObject.otp
          );
          if (!isTokenMatched) {
            return res.status(404).json({
              success: false,
              message: "Invalid OTP",
            });
          } else if (isTokenMatched) {
            try {
              const user = await userModel.findOne({ _id: owner });
              user.isVerified = true;
              user.save();
              await verificationModel.findByIdAndDelete({
                _id: owner,
              });
              return res.status(200).json({
                success: true,
                message: "Email verified successfully!",
              });
            } catch (err) {
              return res.status(500).send({
                success: false,
                message: err,
              });
            }
          }
        }
      }
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};

module.exports = verifyEmailController;
