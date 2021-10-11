const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemService = require('./item');


const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }

});


const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = class CategoryService {

    static async CreateCategory(category) {

        let categoryToInsert = new Category(category);

        let savedCategory = await categoryToInsert.save();
        return savedCategory;
    }

    static async UpdateCategory(id, updatedVersion) {
        return await Category.findByIdAndUpdate(id, { "name": updatedVersion.name }).catch(err => { console.log(err) });
    }

    static async DeleteCategory(id) {

        //Deleting all items that belong to the category before deleting the category itself
        let isSuccess = await ItemService.DeleteAllCategoryItems(id);

        if (isSuccess) {
            return await Category.findByIdAndDelete(id).catch(err => { console.log(err) });;
        }

    }


}