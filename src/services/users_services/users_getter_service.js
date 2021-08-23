const {isFriendForUser} = require('./friends_service');
const {getSearchRegExp} = require('../../utils/reg_exp');
const {User} = require('../../models/user_model');
const {InvalidCredentialsError} = require('../../utils/errors');

const getUserById = async (id) => {
    return User.findOne({_id: id});
};

const getUsersByUsername = async (username, currentUserId) => {
    const users = await User.find({
        $and: [
            {username: {$regex: getSearchRegExp(username)}},
            {_id: {$ne: currentUserId}},
        ],
    });
    return users.map(async (user) => {
        const isFriendWithCurrentUser = await isFriendForUser(currentUserId);
        return {...user._doc, isFriendWithCurrentUser};
    });
};

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
    getUsersByUsername,
};
