const verifyEmailController = require("../controllers/verifyEmailController");
const express = require("express");
const router = express.Router();

const verifyEmailRoute = router.post("verify-email", verifyEmailController);

module.exports = verifyEmailRoute;
