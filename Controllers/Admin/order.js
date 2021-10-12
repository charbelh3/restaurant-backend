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


    else return next(createHttpError(400, "Order not found"));
}

module.exports.acceptPendingOrder = async (req, res, next) => {

    let orderToAccept = await OrderService.AdminAcceptOrder(req.query.id);

    if (orderToAccept) res.send(orderToAccept);

    else return next(createHttpError(500, "Order not found"));
}