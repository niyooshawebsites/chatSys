const loginController = require("../controllers/loginController");
const express = require("express");
const router = express.Router();

const loginRoute = router.post("/login", loginController);
module.exports = loginRoute;
