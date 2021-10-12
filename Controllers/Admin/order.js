const createHttpError = require("http-errors");
const OrderService = require('../../Services/order');

module.exports.getAllPendingOrders = async (req, res, next) => {

    const page = req.query.page || 1;
    const pendingOrders = await OrderService.GetAllPendingOrders(page);

    if (pendingOrders) res.send(pendingOrders);
}


module.exports.rejectPendingOrder = async (req, res, next) => {

    let orderToDelete = await OrderService.AdminRejectOrder(req.query.id);

    if (orderToDelete) {
        res.send(orderToDelete);
    }


    else return next(createHttpError(500, "Server error"));
}