
const {Friends} = require('../models/friends_model');

const getFriendsByUserId = async (id) => {
    return Friends.find({selfId: id});
};

const addFriendToUser = async (selfId, friendId) => {
    await Friends.findOneAndUpdate({selfId}, { $push: {friendsId: friendId}});
}

const deleteFriendForUser = async (selfId, friendId) => {
    await Friends.findOneAndUpdate({selfId}, { $pull: {friendsId: friendId}});
}

module.exports = {
    getFriendsByUserId,
    addFriendToUser,
    deleteFriendForUser
}
