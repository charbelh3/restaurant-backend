const UserService = require("../Services/user");




module.exports.signUp = async (req, res, next) => {
    const userInfo = req.body;

    const createdUser = await UserService.SignUp(userInfo);

    if (!createdUser) {
        res.send("Error");
    }

    res.send({ "username": userInfo.email, name: userInfo.fullName });
}

module.exports.authenticate = async (req, res, next) => {

    const userCredentials = req.body;

    let isSuccess = await UserService.Authenticate(userCredentials);

    if (!isSuccess) res.send("Incorrect password or email");

    else {
        let jwtToken = isSuccess;
        res.send({ "accessToken": jwtToken });
    }
}