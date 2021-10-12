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

module.exports = class BranchService {
    static async GetAllBranches() {
        return await Branch.find();
    }


    static async CreateBranch(branch) {

        let branchToInsert = new Branch();
        branchToInsert.name = branch.name;
        branchToInsert.location.coordinates = branch.coordinates;

        return await branchToInsert.save();
    }

    static async UpdateBranch(id, updatedVersion) {
        return await Branch.findByIdAndUpdate(id, {
            name: updatedVersion.name,
            'location.coordinates': updatedVersion.coordinates
        }, { new: true });
    }

    static async DeleteBranch(id) {
        return await Branch.findByIdAndDelete(id);
    }

    //Getting the nearest branch that is within 5km from the client address
    static async FindBestBranch(addressCoordinates) {

        console.log(addressCoordinates);
        // let branches = await Branch.find(
        //     {
        //         location: {
        //             $near: {
        //                 $geometry: {
        //                     type: "Point",
        //                     coordinates: addressCoordinates
        //                 },
        //                 $maxDistance: 5000,
        //             }
        //         }
        //     }
        // );

        let branches = await Branch.find({ location: { $geoWithin: { $centerSphere: [addressCoordinates, 5000 / 6378.1] } } })
        console.log(branches);

        if (branches.length > 0) return branches[0];
    }

}

branchSchema.index({ location: '2dsphere' });