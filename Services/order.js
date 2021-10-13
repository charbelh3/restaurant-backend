const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BranchService = require('../Services/branch');
const AddressService = require('../Services/address');
const ItemService = require('../Services/item');


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
        type: Number,
        required: false
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

const ELEMENTS_PER_PAGE = 3;

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

                orderToInsert.totalPrice = await this.GetTotalPrice(order.items);
                orderToInsert.userId = userId;
                orderToInsert.items = order.items;
                orderToInsert.addressId = order.addressId;
                orderToInsert.branchId = bestBranch._id;
                return await orderToInsert.save();

            }

            else return false;
        }
    }

    static async GetTotalPrice(items) {

        let itemIds = [];

        items.forEach(element => {
            itemIds.push(element.itemId);
        });

        return await ItemService.GetItemsByIds(itemIds).then((orderItems) => {
            let totalPrice = 0;

            orderItems.forEach((element, index) => {
                console.log(index);
                totalPrice += element.price * items[index].quantity;
            });

            return totalPrice;
        });

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
        let addressCoordinates = await this.GetAddressCoordinates(updatedVersion.addressId);


        if (addressCoordinates) {
            const bestBranch = await this.FindBestBranchForUserOrder(addressCoordinates);

            return await Order.findOneAndUpdate({ _id: orderId, userId: userId }, {
                items: updatedVersion.items, addressId: updatedVersion.addressId,
                branchId: bestBranch._id
            }, { new: true });
        }

        else return false;
    }


    // the following 3 functions are used by the admin controller

    // static async AdminRejectOrder(orderId) {
    //     return await Order.findByIdAndDelete({ _id: orderId, status: 'Pending' });
    // }

    static async AdminRejectOrder(orderId) {
        return await Order.findOneAndUpdate({ _id: orderId, status: 'Pending' }, { status: 'Rejected' }, { new: true });
    }

    static async AdminAcceptOrder(orderId) {
        return await Order.findOneAndUpdate({ _id: orderId, status: 'Pending' }, { status: 'Accepted' }, { new: true });
    }


    static async GetAllPendingOrders(pageNumber) {
        return await Order.aggregate().match({ status: 'Pending' })
            .lookup({ from: 'items', localField: 'items.itemId', foreignField: '_id', as: 'itemsDetails' })
            .lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'user' }).unwind('user')
            .lookup({ from: 'addresses', localField: 'addressId', foreignField: '_id', as: 'address' }).unwind('address')
            .lookup({ from: 'branches', localField: 'branchId', foreignField: '_id', as: 'branch' }).unwind('branch')
            .project({
                addressId: 0, branchId: 0, userId: 0, 'user.role': 0, 'user.password': 0, 'address.location': 0,
                'address.label': 0, 'address.userId': 0, 'branch.location': 0
            })
            .skip((pageNumber - 1) * ELEMENTS_PER_PAGE)
            .limit(ELEMENTS_PER_PAGE);
    }

}

orderSchema.index({ status: 1 });