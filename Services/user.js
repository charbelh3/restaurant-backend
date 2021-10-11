const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../Configuration/config')


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "User"
    }

});

const User = mongoose.model('User', userSchema, 'users');

module.exports = class UserService {

    static async SignUp(user) {

        const doesUserExist = await this.isEmailValid(user.email);

        if (!doesUserExist) {
            let newUser = new User();
            newUser.fullName = user.fullName;
            newUser.email = user.email;
            newUser.password = await bcrypt.hash(user.password, 12);
            newUser.role = user.role || "User";
            newUser.save();
            return true;
        }

        else return false;
    }


    static async Authenticate(user) {
        const userFromDb = await this.isEmailValid(user.email);

        if (!userFromDb) {
            return false;
        }

        if (await bcrypt.compare(user.password, userFromDb.password) == false) { return false }

        else {
            let jwtToken = await this.issueJTWToken(userFromDb);
            return jwtToken;
        }
    }

    static async ViewProfile(userId) {
        return await User.findById(userId);
    }

    static async isEmailValid(email) {
        const existingUser = await User.findOne({ email: email });

        return existingUser;
    }

    static async issueJTWToken(user) {
        const token = await jwt.sign({ email: user.email, userId: user._id.toString(), role: user.role },
            config.appSecret,
            { expiresIn: '2h' });


        return token;
    }
}

//adding an index on the email field.
userSchema.index({ email: 1 });