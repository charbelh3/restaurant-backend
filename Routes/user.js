const express = require("express");
const router = express.Router();
const userController = require('../Controllers/user');
const { validate } = require('express-validation');
const Joi = require('joi');

const SignUpValidation = {
    body: Joi.object({
        email: Joi.string().min(3).required().email(),
        fullName: Joi.string().required(),
        password: Joi.string().min(3).required(),

    }).strict()
}

const authenticationValidation = {
    body: Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),

    }).strict()
}


router.post('/signUp', validate(SignUpValidation), userController.signUp);
router.post('/authenticate', validate(authenticationValidation), userController.authenticate);

module.exports = router;