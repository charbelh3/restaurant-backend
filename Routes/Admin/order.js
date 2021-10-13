const express = require("express");
const router = express.Router();
const adminOrderController = require('../../Controllers/Admin/order');
const Joi = require('joi');
const { validate } = require('express-validation');


const bodyValidation = {
    body: Joi.object({
        isAccepted: Joi.boolean().required(),
    }).strict()
}


router.get("/getAllPendingOrders", adminOrderController.getAllPendingOrders);
router.post("/rejectOrAcceptOrder", validate(bodyValidation), adminOrderController.rejectOrAcceptOrder)

module.exports = router;

