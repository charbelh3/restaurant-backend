const ItemService = require('../Services/item');
const createHttpError = require('http-errors');

module.exports.createItem = async (req, res, next) => {
    let item = await ItemService.CreateItem(req.body);

    if (item) { res.send(item); }
}

module.exports.updateItem = (req, res, next) =>{
    res.send("create item works");
}

module.exports.deleteItem = (req, res, next) => {
    res.send("create item works");
}