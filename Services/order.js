const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BranchService = require('../Services/branch');
const AddressService = require('../Services/address');


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
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            },
            quantity: {
                type: Number,
                required: true
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
        return await Order.find({ userId: userId, status: 'Pending' });
    }

    static async CreateOrder(order, userId) {

        let addressCoordinates = await this.GetAddressCoordinates(order.addressId);


        if (addressCoordinates) {
            const bestBranch = await this.FindBestBranchForUserOrder(addressCoordinates);

            if (bestBranch) {
                let orderToInsert = new Order()
                orderToInsert.userId = userId;
                orderToInsert.items = order.items;
                orderToInsert.addressId = order.addressId;
                orderToInsert.branchId = bestBranch._id;
                return await orderToInsert.save();
            }

            else return false;
        }
    }

    static async FindBestBranchForUserOrder(coordinates) {
        let bestBranch = await BranchService.FindBestBranch(coordinates);

        return bestBranch;
    }

    static async GetAddressCoordinates(addressId) {
        return await AddressService.GetAddressCoordinates(addressId);
    }


    static async UserCancelOrder(orderId, userId) {
        return await Order.findOneAndDelete({ _id: orderId, userId: userId, status: 'Pending' });
    }

    static async UpdateOrder(orderId, userId, updatedVersion) {

    }

    static async AdminRejectOrder(orderId) {
        return await Order.findOneAndDelete({ _id: orderId, status: 'Pending' });
    }

    static async AdminAcceptOrder(orderId) {
        return await Order.findOneAndUpdate({ _id: orderId, status: 'Pending' }, { status: 'Accepted' });
    }



}