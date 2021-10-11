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
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            default: "Point"
        },

        coordinates: { type: [Number], index: '2dsphere', required: true }
    }

});

const Address = mongoose.model('Address', categorySchema, 'addresses');