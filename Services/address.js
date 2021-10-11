const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const addressSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    completeAddress: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: "Point"
        },

        coordinates: { type: [Number], index: '2dsphere', required: true }
    }

});

const Address = mongoose.model('Address', addressSchema, 'addresses');

module.exports = class AddressService {

    static async GetAllAddresses(userId) {

    }

    static async CreateAddress(userId, address) {

    }


    static async UpdateAddress(addressId, updatedVersion) {

    }

    static async DeleteAddress(addressId) {

    }

}