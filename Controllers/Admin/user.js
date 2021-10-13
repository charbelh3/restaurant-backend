const createHttpError = require("http-errors");
const UserService = require('../../Services/user');

module.exports.enableOrDisableUser = async (req, res, next) => {

    const id = req.query.id;

    if (!id) return next(createHttpError(400, "Missing Id query param"))

    if (req.body.isActive == 0) {
        let isSuccess = await UserService.DisableUser(id);

        if (isSuccess) res.send({ "Message": "User Disabled" })
        else return next(createHttpError(400, "User not found"))
    }

    else if (req.body.isActive == 1) {
        let isSuccess = await UserService.EnableUser(id);
        if (isSuccess) res.send({ "Message": "User Enabled" })

        else return next(createHttpError(400, "User not found"))
    }

}
