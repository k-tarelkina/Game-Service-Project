
const {FriendsRecord} = require('../models/friends_model');

const getFriendsByUserId = async (id) => {
    return FriendsRecord.find({selfId: id});
};

const addFriendToUser = async (selfId, friendId) => {
    const self = FriendsRecord.findOne({selfId});
    if (!self) {
        const newRecord = new FriendsRecord({selfId, friendsId: [friendId]});
        await newRecord.save();
    } else {
        self.friendsId.push(friendId);
        await self.save();
    }
}

const deleteFriendForUser = async (selfId, friendId) => {
    await FriendsRecord.findOneAndUpdate({selfId}, { $pull: {friendsId: friendId}});
}

module.exports = {
    getFriendsByUserId,
    addFriendToUser,
    deleteFriendForUser
}
