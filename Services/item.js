const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

});

const Item = mongoose.model('Item', itemSchema, 'items');

module.exports = class ItemService {

    static async CreateItem(item) {

    }

    static async UpdateItem(id, newVersion) {

    }

    static async DeleteItem(id) {

    }

}