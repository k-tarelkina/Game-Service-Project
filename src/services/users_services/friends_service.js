const {getUsersByIds} = require("./users_getter_service");
const {FriendsRecord} = require('../../models/friends_model');

const getUserRecordById = async (id) => {
    return FriendsRecord.findOne({selfId: id});
};

const getFriendsByUserId = async (id) => {
    const {friendsId} = await getUserRecordById(id);
    return getUsersByIds(friendsId);
};

const deleteUserRecord = async (id) => {
    await FriendsRecord.deleteOne({selfId: id});
};

const addFriendToUser = async (selfId, friendId) => {
    const self = await FriendsRecord.findOne({selfId});
    if (!self) {
        const newRecord = new FriendsRecord({selfId, friendsId: [friendId]});
        await newRecord.save();
    } else {
        await FriendsRecord.findOneAndUpdate({selfId}, { $push: {friendsId: friendId}});
    }
}

const deleteFriendForUser = async (selfId, friendId) => {
    await FriendsRecord.findOneAndUpdate({selfId}, { $pull: {friendsId: friendId}});
}

module.exports = {
    getFriendsByUserId,
    addFriendToUser,
    deleteFriendForUser,
    deleteUserRecord
}
