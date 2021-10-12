const createHttpError = require("http-errors");
const OrderService = require('../Services/order');

module.exports.getUserOrders = async (req, res, next) => {
    let orders = await OrderService.GetUserOrders(req.userId);

    if (orders) res.send(orders);
}

module.exports.createOrder = async (req, res, next) => {
    let orderToCreate = await OrderService.CreateOrder(req.body, req.userId);

    if (orderToCreate) res.send(orderToCreate);

    else return next(createHttpError(400, 'Cannot create order'));

}

module.exports.updateOrder = async (req, res, next) => {
    let orderToUpdate = await OrderService.UpdateOrder(req.query.id, req.userId, req.body);

    if (orderToUpdate) res.send(orderToUpdate);

    else return next(createHttpError(400, 'Cannot create order'));
}

module.exports.cancelOrder = async (req, res, next) => {
    let orderToCancel = await OrderService.UserCancelOrder(req.query.id, req.userId);

    if (orderToCancel) res.send(orderToCancel);

    else return next(createHttpError(400, 'Could not find order'));
}

