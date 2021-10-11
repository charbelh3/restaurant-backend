const createHttpError = require("http-errors");
const UserService = require("../Services/user");

module.exports.signUp = async (req, res, next) => {
    const userInfo = req.body;

    const createdUser = await UserService.SignUp(userInfo);

    if (!createdUser) {
        return next(createHttpError(400, "Email already in use."));
    }

    else res.send({ "username": userInfo.email, name: userInfo.fullName });
}

module.exports.authenticate = async (req, res, next) => {

    const userCredentials = req.body;

    let isSuccess = await UserService.Authenticate(userCredentials);

    if (!isSuccess) return next(createHttpError(400, "Incorrect email or password"));

    else {
        let jwtToken = isSuccess;
        res.send({ "accessToken": jwtToken });
    }
}