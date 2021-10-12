const createHttpError = require("http-errors");
const OrderService = require('../Services/order');

module.exports.getUserOrders = async (req, res, next) => {

}

module.exports.createOrder = async (req, res, next) => {
    let orderToCreate = await OrderService.CreateOrder(req.body, req.userId);

}

module.exports.updateOrder = async (req, res, next) => {

}

module.exports.cancelOrder = async (req, res, next) => {

}

