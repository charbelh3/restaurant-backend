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

        let categoryToInsert = new Category(category);

        let savedCategory = await categoryToInsert.save();
        return savedCategory;
    }

    static async UpdateCategory(id, updatedVersion) {
        return await Category.findByIdAndUpdate(id, { "name": updatedVersion.name }).catch(err => { console.log(err) });
    }

    static async DeleteCategory(id) {
        return await Category.findByIdAndDelete(id).catch(err => { console.log(err) });;
    }


}