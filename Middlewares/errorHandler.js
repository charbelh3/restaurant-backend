module.exports = (error, req, res, next) => {

    res.statusCode = error.statusCode;
    res.send({ "Error Message": error.message });
    next();
}