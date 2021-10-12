const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    status: {
        type: String,
        default: "Pending"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            item: {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Item'
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        }
    ],
    totalPrice: {
        type: Number
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'Branch'
    },

});

const Order = mongoose.model('Order', orderSchema, 'orders');