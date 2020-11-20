const mongo = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const hashPassword = require('./passwords/hashPass');
const privateKey = process.env.TOP_PRIVATEKEY;

const userSchema = new mongo.Schema( {
    userName: {type: String, unique: true},
    fullName: {type: String, unique: true},
    userType: {type: String},
    password: String
});

const userValidate = Joi.object({
    userName: Joi.string().min(4).max(50).required(),
    fullName: Joi.string().min(4).max(50).required(),
    userType: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(5).max(20).required()
});

const User = mongo.model('users',userSchema);

async function addUser(userData) {
    const user = new User({
        userName: userData.userName,
        fullName: userData.fullName,
        userType: userData.userType,
        password: await hashPassword.hash(userData.password)
    });
    return await user.save();
};

async function isUserExists(userData) {
    let result = await User.find({userName: userData.userName}).select({_id: 1});
    if (result.length === 0) {
        result = await User.find({fullName: userData.fullName}).select({_id: 1});
        if (result.length === 0) {
            return false;
        } else {
            return true;
        }       
    } else {
        return true;
    }
};

async function userLogin(userData) {
    const result = await User.find({userName: userData.userName}).select({_id:1, fullName:1, userType:1, userName:1, password:1});
    if (result.length === 0) {
        return false;
    } else {
        const validate = await hashPassword.validate(userData.password,result[0].password);
        if (!validate) {
            return false;
        } else {
            const token = jwt.sign({_id: result[0]._id, fullName: result[0].fullName, userType: result[0].userType}, privateKey);
            result.token = token
            return result;
        }
    }
};

async function getUsers() {
    return await User.find().select({_id:1, fullName:1, userType:1, userName:1});
};

async function deleteUser(userID) {
    return await User.findByIdAndDelete(userID);
}


module.exports = {
    userValidate: userValidate,
    addUser: addUser,
    isUserExists: isUserExists,
    userLogin: userLogin,
    getUsers: getUsers,
    deleteUser: deleteUser
}