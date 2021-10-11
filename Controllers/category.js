const CategoryService = require('../Services/category');


module.exports.createCategory = async (req, res, next) => {
    const category = req.body;

    const savedCategory = await CategoryService.CreateCategory(category);

    if (!savedCategory) return next(createHttpError(500, "Server error"));

    res.statusCode = 201;
    res.send(savedCategory)
}

module.exports.updateCategory = async (req, res, next) => {
    res.send("Update category works");
}

module.exports.deleteCategory = async (req, res, next) => {
    res.send("Delete category works");
}