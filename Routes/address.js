const express = require("express");
const router = express.Router();
const Joi = require('joi');
const { validate } = require('express-validation');
const addressController = require('../Controllers/address');

const addressValidation = {
    body: Joi.object({
        label: Joi.string().required(),
        completeAddress: Joi.string().required(),
        coordinates: Joi.array().
            items(Joi.number().min(-180).max(180).required(),
                Joi.number().min(-90).max(90).required())

    }).strict()
}



router.get("/getAllAddresses", addressController.getAllAddresses)
router.post("/createAddress", validate(addressValidation), addressController.createAddress)
router.put("/updateAddress", validate(addressValidation), addressController.updateAddress)
router.delete("/deleteAddress", addressController.deleteAddress)



module.exports = router;