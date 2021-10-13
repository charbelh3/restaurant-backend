const createHttpError = require("http-errors");
const UserService = require('../../Services/user');

module.exports.enableOrDisableUser = async (req, res, next) => {

    const userId = req.query.userId;

    if (req.body.isActive == 0) {
        UserService.DisableUser(userId);
    }

    else if (req.body.isActive == 1) {
        UserService.EnableUser(userId);
    }

}
