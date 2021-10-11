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
        let itemToInsert = new Item(item);
        return await itemToInsert.save();

    }

    static async UpdateItem(id, updatedVersion) {

        //added { new: true } to return the newest version to my controller
        return await Item.findByIdAndUpdate(id, updatedVersion, { new: true }).catch(err => { console.log(err) });
    }

    static async DeleteItem(id) {
        return await Item.findByIdAndDelete(id).catch(err => { console.log(err) });
    }

}