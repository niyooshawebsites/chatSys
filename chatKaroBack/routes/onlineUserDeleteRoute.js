const express = require();
const router = express.Router();
const deleteOnlineUserController = require("../controllers/deleteOnlineUserConroller");

const onlineuserDeleteRoute = router.delete(
  "/delete-onlineUser/id",
  deleteOnlineUserController
);

module.exports = onlineuserDeleteRoute;
