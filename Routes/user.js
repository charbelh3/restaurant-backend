const express = require("express");
const router = express.Router();
const userController = require('../Controllers/user');
const { validate } = require('express-validation');
const Joi = require('joi');
const authorization = require('../Middlewares/authorization');

const SignUpValidation = {
    body: Joi.object({
        email: Joi.string().min(3).required().email(),
        fullName: Joi.string().required(),
        password: Joi.string().min(3).required(),
        role: Joi.string()

    }).strict()
}

const authenticationValidation = {
    body: Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),

    }).strict()
}


const updatedProfileValidation = {
    body: Joi.object({
        fullName: Joi.string().min(3),
        password: Joi.string().min(3),
    }).strict()
}



router.post('/signUp', validate(SignUpValidation), userController.signUp);
router.post('/authenticate', validate(authenticationValidation), userController.authenticate);
router.get('/viewProfile', authorization.isAuthorizedUser, userController.viewProfile)
router.put('/updateProfile', validate(updatedProfileValidation), authorization.isAuthorizedUser, userController.updateProfile)

module.exports = router;