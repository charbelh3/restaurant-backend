const express = require("express");
const router = express.Router();
const adminUserController = require('../../Controllers/Admin/user');
const Joi = require('joi');
const { validate } = require('express-validation');


const bodyValidation = {
    body: Joi.object({
        isActive: Joi.boolean().required(),

    }).strict()
}

router.post("/enableOrDisableUser", validate(bodyValidation), adminUserController.enableOrDisableUser)

module.exports = router;