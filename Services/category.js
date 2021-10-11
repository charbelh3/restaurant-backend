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
        //added { new: true } to return the newest version to my controller
        return await Category.findByIdAndUpdate(id, updatedVersion, { new: true }).catch(err => { console.log(err) });
    }

    static async DeleteCategory(id) {

        //Deleting all items that belong to the category before deleting the category itself
        let isSuccess = await ItemService.DeleteAllCategoryItems(id);

        if (isSuccess) {
            return await Category.findByIdAndDelete(id).catch(err => { console.log(err) });;
        }
    }

    static async GetCategoryItems(categoryName, pageNumber)
    {
        return await Post.aggregate().lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'PostedBy' })
        .project({ "PostedBy.password": 0 })
        .skip((pageNumber - 1) * ELEMENTS_PER_PAGE).limit(ELEMENTS_PER_PAGE);
    }

}