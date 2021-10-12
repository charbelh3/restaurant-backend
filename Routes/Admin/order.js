const express = require("express");
const router = express.Router();
const adminOrderController = require('../../Controllers/Admin/order');


router.get("/getAllPendingOrders", adminOrderController.getAllPendingOrders);
router.post("/rejectOrAcceptOrder", adminOrderController.rejectOrAcceptOrder)

module.exports = router;

