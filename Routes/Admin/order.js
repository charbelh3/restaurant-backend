const express = require("express");
const router = express.Router();
const adminOrderController = require('../../Controllers/Admin/order');


router.get("/getAllPendingOrders", adminOrderController.getAllPendingOrders);
router.delete("/rejectPendingOrder", adminOrderController.rejectPendingOrder);
router.put("/acceptPendingOrder", adminOrderController.acceptPendingOrder);

module.exports = router;

