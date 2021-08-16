const {encryptPassword} = require("../utils/password_processing");
const {User} = require('../models/user_model');
const {InvalidCredentialsError} = require('../utils/errors');

const getUserById = async (id) => {
    return User.findOne({_id: id});
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({email: email});
    if (!user) {
        throw new InvalidCredentialsError();
    }
    return user;
};

const deleteUserById = async (id) => {
    return User.deleteOne({_id: id});
};

const updateUserById = async (id, data) => {
    if (data.password) {
        data.password = await encryptPassword(data.password);
    }
    return User.updateOne({_id: id}, data);
};

module.exports = {
    getUserById,
    getUserByEmail,
    deleteUserById,
    updateUserById,
};
