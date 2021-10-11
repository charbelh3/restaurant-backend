const ItemService = require('../../Services/item');
const createHttpError = require('http-errors');

module.exports.createItem = async (req, res, next) => {
    let item = await ItemService.CreateItem(req.body);

    if (item) { res.send(item); }

    else return next(createHttpError(500, "Server error"));
}

module.exports.updateItem = async (req, res, next) => {
    let updatedItem = await ItemService.UpdateItem(req.query.id, req.body);

    if (updatedItem) res.send(updatedItem);

    else return next(createHttpError(400, "Item not found"));

}

module.exports.deleteItem = async (req, res, next) => {
    let isSuccess = await ItemService.DeleteItem(req.query.id);

    if (isSuccess) res.send(isSuccess);

    else return next(createHttpError(400, "Item not found"));


}