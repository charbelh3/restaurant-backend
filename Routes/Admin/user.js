const express = require("express");
const router = express.Router();
const adminUserController = require('../../Controllers/Admin/user');


router.post("/enableOrDisableUser", adminUserController.enableOrDisableUser)

module.exports = router;