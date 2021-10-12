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

        coordinates: { type: [Number], required: true },

    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Address = mongoose.model('Address', addressSchema, 'addresses');

module.exports = class AddressService {

    static async GetAllAddresses(userId) {
        return await Address.find({ userId: userId });
    }

    static async CreateAddress(userId, address) {
        let addressToInsert = new Address();
        addressToInsert.label = address.label;
        addressToInsert.completeAddress = address.completeAddress;
        addressToInsert.location.coordinates = address.coordinates;
        addressToInsert.userId = userId;

        return await addressToInsert.save();

    }


    static async UpdateAddress(addressId, updatedVersion, userId) {

        //make sure the user updating the address owns the address before having the permission to do so

        let isSuccess = await Address.findOne({ _id: addressId, userId: userId });

        if (isSuccess) {
            return await Address.findByIdAndUpdate(addressId, {
                label: updatedVersion.label, completeAddress: updatedVersion.completeAddress,
                'location.coordinates': updatedVersion.coordinates
            }, { new: true });
        }

        else return false;

    }

    static async DeleteAddress(addressId) {

    }

}


addressSchema.index({ location: '2dsphere' });
addressSchema.index({ userId: 1 });