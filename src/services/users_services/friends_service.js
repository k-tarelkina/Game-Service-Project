const {FriendsRecord} = require('../../models/friends_record_model');

const getFriendsRequestsToUserByStatus = async (userId, status) => {
    return FriendsRecord.find({
        $and: [
            {friendId: userId},
            {status},
        ],
    });
};

const getFriendsRequestsFromUserByStatus = async (userId, status) => {
    return FriendsRecord.find({
        $and: [
            {selfId: userId},
            {status},
        ],
    });
};


const getFriendsByUserId = async (id) => {
    return FriendsRecord.find({
        $and: [
            {
                $or: [{selfId: id}, {friendId: id}],
            },
            {
                status: 'ACCEPTED',
            },
        ],
    });
};

const addRequestForFriend = async (selfId, friendId) => {
    const record = new FriendsRecord({selfId, friendId});
    await record.save();
};

const changeRequestStatus = async (selfId, friendId, status) => {
    await FriendsRecord.findOneAndUpdate({selfId, friendId}, {status});
};

const deleteFriendForUser = async (selfId, friendId) => {
    await FriendsRecord.findOneAndDelete({
        $or: [
            {
                $and: [{selfId}, {friendId}],
            },
            {
                $and: [{selfId: friendId}, {friendId: selfId}],
            },
        ]});
};

const deleteUserFriends = async (id) => {
    await FriendsRecord.deleteOne({selfId: id});
};

const isFriendForUser = async (userId, possibleFriend) => {
    const record = await FriendsRecord
        .findOne({selfId: userId}, {friendId: possibleFriend});
    return !!record;
};

module.exports = {
    getFriendsByUserId,
    addRequestForFriend,
    deleteFriendForUser,
    deleteUserFriends,
    getFriendsRequestsToUserByStatus,
    getFriendsRequestsFromUserByStatus,
    changeRequestStatus,
    isFriendForUser,
};

