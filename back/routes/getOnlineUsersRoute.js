const express = require("express");
const router = express.Router();
const getOnlineUsersController = require("../controllers/getOnlineUsersController");

const getOnlineUsersRoute = router.get(
  "/all-online-users",
  getOnlineUsersController
);

module.exports = getOnlineUsersRoute;
