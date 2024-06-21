const express = require("express");
const router = express.Router();
const deleteOnlineUserController = require("../controllers/deleteOnlineUserConroller");

const onlineuserDeleteRoute = router.delete(
  "/del-onlineuser/:name",
  deleteOnlineUserController
);

module.exports = onlineuserDeleteRoute;
