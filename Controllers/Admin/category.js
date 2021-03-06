const CategoryService = require('../../Services/category');
const createHttpError = require('http-errors');


module.exports.createCategory = async (req, res, next) => {
    const category = req.body;

    const savedCategory = await CategoryService.CreateCategory(category);

    if (!savedCategory) return next(createHttpError(500, "Server error"));

    res.statusCode = 201;
    res.send(savedCategory)
}

module.exports.updateCategory = async (req, res, next) => {
    const id = req.query.id;
    const category = req.body;
    const updatedCategory = await CategoryService.UpdateCategory(id, category);

    if (!updatedCategory) return next(createHttpError(400, "Product does not exist"));

    else res.send(updatedCategory)

}

module.exports.deleteCategory = async (req, res, next) => {
    const id = req.query.id;
    const category = await CategoryService.DeleteCategory(id);

    if (!category) return next(createHttpError(400, "Category does not exist"));

    res.send(category);
}

module.exports.uploadCategoryImage = async (req, res, next) => {

    const id = req.query.id;
    console.log(id);
    if (!id) return next(createHttpError(400, "Id not found"));


    if (!req.file)
        return next(createHttpError(400, "No image was provided"));

    else {
        let saveImagePath = await CategoryService.UploadCategoryImage(id, req.file.path);
        if (saveImagePath) res.send({"Message":"Successfully uploaded image"});

    }
}