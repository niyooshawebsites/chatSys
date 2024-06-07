const verifyEmailController = require("../controllers/verifyEmailController");
const express = require("express");
const router = express.Router();

const verifyEmailGetRoute = router.get("/verify-email/:owner", (req, res) => {
  console.log(req.params["owner"]);
});
const verifyEmailPostRoute = router.post(
  "/verify-email",
  verifyEmailController
);

module.exports = { verifyEmailGetRoute, verifyEmailPostRoute };
