const createHttpError = require("http-errors");
const OrderService = require('../../Services/order');

module.exports.getAllPendingOrders = async (req, res, next) => {

    const page = req.query.page || 1;
    const pendingOrders = await OrderService.GetAllPendingOrders(page);

    if (pendingOrders) res.send(pendingOrders);
}