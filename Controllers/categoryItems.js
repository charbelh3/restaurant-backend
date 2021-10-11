
const createHttpError = require('http-errors');
const CategoryService = require('../Services/category');
const ItemService = require('../Services/item');

module.exports.GetCategoryItems = async (req, res, next) => {

    const page = req.query.page || 1;
    const nameSearch = req.query.search;
    const categoryFilter = req.query.category;

    if (nameSearch) {
        let items = await ItemService.GetItemsByNameSearch(nameSearch, page)

        if (items)
            res.send(items);
    }

    else if (categoryFilter) {
        let items = await ItemService.GetCategoryItemsByCategory(categoryFilter, page)

        if (items)
            res.send({ "categoryName": categoryFilter, "items": items });
    }

    else {
        return next(createHttpError(400, "Missing filters"));
    }


    res.send("asda")
}