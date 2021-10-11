const mongoose = require("mongoose");
const Schema = mongoose.Schema;



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

        let categoryToInsert = new Category();
        categoryToInsert.name = category.name;

        let savedCategory = await categoryToInsert.save();
        return savedCategory;
    }

    static async UpdateCategory(id, updatedVersion) {

    }

    static async DeleteCategory(id) {

    }


}