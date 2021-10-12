const express = require("express");
const router = express.Router();
const orderController = require('../Controllers/order');
const { validate } = require('express-validation');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const OrderValidation = {
    body: Joi.object({
        items: Joi.array().items(
            {
                itemId: Joi.objectId(),
                quantity: Joi.number().required()
            }

        ).unique("itemId")
    }).strict()
}

router.get("/getUserOrders", orderController.getUserOrders);
router.post("/createOrder", validate(OrderValidation), orderController.createOrder)
router.put("/updateOrder", validate(OrderValidation), orderController.updateOrder)
router.delete("/cancelOrder", orderController.cancelOrder)


module.exports = router;