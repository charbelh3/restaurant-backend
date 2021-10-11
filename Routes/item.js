const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validate } = require('express-validation');
const itemController = require('../Controllers/item');
// Joi.objectId = require('joi-objectid')(Joi)

const itemValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        details: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string()
    }).strict()
}

router.post('/createItem', validate(itemValidation), itemController.createItem);
router.put('/updateItem', validate(itemValidation), itemController.updateItem);
router.delete('/deleteItem', itemController.deleteItem);


module.exports = router;