const signupController = require("../controllers/signupController");
const express = require("express");
const router = express.Router();

const signupRoute = router.post("/signup", signupController);
module.exports = signupRoute;
