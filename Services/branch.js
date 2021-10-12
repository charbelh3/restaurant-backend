const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const branchSchema = new Schema({
    name: {
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

    }
});

const Branch = mongoose.model('Branch', branchSchema, 'branches');

module.exports = class AddressService { }

branchSchema.index({ location: '2dsphere' });