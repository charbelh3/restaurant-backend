const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validate } = require('express-validation');
const categoryController = require('../Controllers/category');
const authorization = require('../Middlewares/authorization');

const categoryValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        image: Joi.string()
    }).strict()
}

router.post('/createCategory', validate(categoryValidation), authorization.isAdmin, categoryController.createCategory);
router.put('/updateCategory', validate(categoryValidation), authorization.isAdmin, categoryController.updateCategory);
router.delete('/deleteCategory', authorization.isAdmin, categoryController.deleteCategory);


module.exports = router;