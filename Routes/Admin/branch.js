const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validate } = require('express-validation');
const branchController = require('../../Controllers/Admin/branch');


const branchValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        coordinates: Joi.array().
            items(Joi.number().min(-180).max(180).required(),
                Joi.number().min(-90).max(90).required())

    }).strict()
}

router.get("/getAllBranches", branchController.getAllBranches)
router.post("/createBranch", validate(branchValidation), branchController.createBranch)
router.put("/updateBranch", validate(branchValidation), branchController.updateBranch)
router.delete("/deleteBranch", branchController.deleteBranch)



module.exports = router;