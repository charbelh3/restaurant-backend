const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validate } = require('express-validation');
const categoryController = require('../Controllers/category');

const categoryValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        image: Joi.string()
    }).strict()
}

router.post('/createCategory', validate(categoryValidation), categoryController.createCategory);
router.put('/updateCategory', validate(categoryValidation), categoryController.updateCategory);
router.delete('/deleteCategory', categoryController.deleteCategory);


module.exports = router;