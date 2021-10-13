const createHttpError = require("http-errors");
const OrderService = require('../../Services/order');

module.exports.getAllPendingOrders = async (req, res, next) => {

    const page = req.query.page || 1;
    const pendingOrders = await OrderService.GetAllPendingOrders(page);

    if (pendingOrders) res.send(pendingOrders);
}


module.exports.rejectOrAcceptOrder = async (req, res, next) => {

    if (req.body.isAccepted == true) {
        let orderToAccept = await OrderService.AdminAcceptOrder(req.query.id);

        if (orderToAccept) res.send(orderToAccept);
        else return next(createHttpError(400, "Order not found"));
    }

    else if (req.body.isAccepted == false) {
        let orderToReject = await OrderService.AdminRejectOrder(req.query.id);

        if (orderToReject) res.send(orderToReject)
        else return next(createHttpError(400, "Order not found"));
    }

}