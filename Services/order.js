const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BranchService = require('../Services/branch');


const orderSchema = new Schema({
    status: {
        type: String,
        default: "Pending"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
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
    orderedAt: {
        type: Date,
        default: Date.now
    }

});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = class OrderService {

    static async GetUserOrders(userId) {

    }

    static async CreateOrder(order, userId) {

    }

    static async FindBestBranchForUserOrder(coordinates) {
        let bestBranch = await BranchService.FindBestBranch(coordinates);

        return bestBranch;
    }


    static async UserCancelOrder(orderId, userId) {

    }

    static async UpdateOrder(orderId, userId, updatedVersion) {

    }

    static async AdminRejectOrder(orderId) {

    }

    static async AdminAcceptOrder(orderId) {

    }



}