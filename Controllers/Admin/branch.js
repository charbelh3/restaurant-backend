const createHttpError = require('http-errors');
const BranchService = require('../../Services/branch');

module.exports.getAllBranches = async (req, res, next) => {
    let branches = await BranchService.GetAllBranches();

    if (!branches) return next(createHttpError(500, "Server error"))

    else res.send(branches);
}

module.exports.createBranch = async (req, res, next) => {
    let branchToCreate = await BranchService.CreateBranch(req.body);

    if (!branchToCreate) return next(createHttpError(500, "Server error"));

    else res.send(branchToCreate);
}

module.exports.updateBranch = async (req, res, next) => {
}

module.exports.deleteBranch = async (req, res, next) => {
}