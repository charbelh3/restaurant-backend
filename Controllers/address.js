const createHttpError = require("http-errors");
const AddressService = require("../Services/address");


module.exports.getAllAddresses = async (req, res, next) => {
    const addresses = await AddressService.GetAllAddresses(req.userId);

    if (addresses) res.send(addresses);

    else return next(createHttpError(500, "Server error"))
}


module.exports.createAddress = async (req, res, next) => {
    const addressToInsert = await AddressService.CreateAddress(req.userId, req.body);

    if (addressToInsert) {
        res.statusCode = 201;
        res.send(addressToInsert);
    }

    else return next(createHttpError(500, "Server error"))
}

module.exports.updateAddress = async (req, res, next) => {
    const updatedAddress = await AddressService.UpdateAddress(req.query.id, req.body);

    if (updatedAddress) res.send(updatedAddress);

    else return next(createHttpError(400, "Address does not exist"));

}

module.exports.deleteAddress = async (req, res, next) => {

}