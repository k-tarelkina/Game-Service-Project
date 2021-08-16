const {User} = require('../../models/user_model');
const {InvalidCredentialsError} = require('../../utils/errors');

const getRegExp = (value) => `.*${value}.*`;

const getUserById = async (id) => {
    return User.findOne({_id: id});
};

const getUsersByUsername = async (username) => {
    return User.find({username: {$regex: getRegExp(username)}});
}

const getUsersByIds = async (ids) => {
    const users = [];
    for (const id of ids) {
        const user = await getUserById(id);
        users.push(user);
    }
    return users;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({email: email});
    if (!user) {
        throw new InvalidCredentialsError();
    }
    return user;
};

module.exports = {
    getUserById,
    getUsersByIds,
    getUserByEmail,
    getUsersByUsername
};