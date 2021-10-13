const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('../configuration/config')
const UserService = require('../Services/user')


//Making sure the token is valid and saving the ID of the user making the request


module.exports.isAuthorizedUser = async (req, res, next) => {

    //Check if the request contains an authorization header
    if (!req.get('Authorization')) { next(createHttpError(401, 'Missing or Invalid Token.')); }


    //getting the token
    const token = req.get('Authorization').split(' ')[1];

    //Verify and return the decoded token if valid
    let decodedToken = await verifyAndGetToken(token);

    if (!decodedToken) return next(createHttpError(401, 'Missing or Invalid Token.'));


    //Saving the sender document ID
    req.userId = decodedToken.userId;
    console.log(req.userId);

    //Check if user is disabled or enabled
    let status = await checkUserStatus(decodedToken.userId);

    if (status == false) {
        return next(createHttpError(401, 'Disabled user account'));
    }

    else if (status == true) next();

}


module.exports.isAdmin = async (req, res, next) => {
    if (!req.get('Authorization')) { next(createHttpError(401, 'Missing or Invalid Token.')); }

    //getting the token
    const token = req.get('Authorization').split(' ')[1];

    let decodedToken = await verifyAndGetToken(token);

    if (!decodedToken) return next(createHttpError(401, 'Missing or Invalid Token.'));

    if (decodedToken.role != 'Admin') {
        throw createHttpError(403, 'You do not have enough permissions for that action.');
    }
    //Saving the sender document ID
    req.userId = decodedToken.userId;

    next();
}


async function verifyAndGetToken(token, req, res, next) {
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, config.appSecret);
    }
    catch (err) {
        console.log(err);
    }
    return decodedToken;
}

async function checkUserStatus(id) {
    return await UserService.GetUserStatus(id);
}
