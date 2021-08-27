const {getUserById} = require('./users_getter_service');
const {getUsersByUsername} = require('./users_getter_service');
const {FriendRecord} = require('../../models/friends_record_model');

const getFriendId = (currentUserId, friendRecord) => {
    const {friendId, selfId} = friendRecord;
    return String(currentUserId) === String(selfId) ? friendId : selfId;
};

const addFriendInfoToRecord = async (currentUserId, friendRecord) => {
    const friendRecordCopy = Object.assign({}, friendRecord._doc);
    const idOfFriendToFind = getFriendId(currentUserId, friendRecordCopy);
    const friend = await getUserById(idOfFriendToFind);
    if (friend) {
        const {_id, username} = friend;
        friendRecordCopy.friend = {_id, username};
        return friendRecordCopy;
    }
    return null;
};

const addFriendsInfoToRecords = async (currentUserId, friendsRecords) => {
    const formattedFriends = [];
    for (const friendRecord of friendsRecords) {
        const friendRecordFormatted = await addFriendInfoToRecord(currentUserId,
            friendRecord);
        if (friendRecordFormatted) {
            formattedFriends.push(friendRecordFormatted);
        }
    }
    return formattedFriends;
};

const getFriendsByUsernameForUser = async (userId, username) => {
    const usersWithThisUsername = await getUsersByUsername(username, userId);
    const friendsRecords = [];
    for (let i = 0; i < usersWithThisUsername.length; i += 1) {
        const user = usersWithThisUsername[i];
        const friendRecord = await FriendRecord.findOne(
            {selfId: userId, friendId: user._id},
        );
        if (friendRecord) {
            friendsRecords.push(friendRecord);
        } else {
            friendsRecords.push(new FriendRecord({
                selfId: userId,
                friendId: user._id,
                status: 'EMPTY',
            }));
        }
    }
    return friendsRecords;
};

const getFriendsRequestsToUserByStatus = async (userId, status) => {
    return FriendRecord.find({
        $and: [
            {friendId: userId},
            {status},
        ],
    });
};

const getFriendsRequestsFromUserByStatus = async (userId, status) => {
    return FriendRecord.find({
        $and: [
            {selfId: userId},
            {status},
        ],
    });
};

const getFriendsByUserId = async (id) => {
    return FriendRecord.find({
        $or: [
            {
                $and: [
                    {
                        $or: [{selfId: id}, {friendId: id}],
                    },
                    {status: 'ACCEPTED'},
                ],
            },
            {
                $and: [
                    {selfId: id},
                    {status: 'PENDING'},
                ],
            },
        ],
    });
};

const addRequestForFriend = async (selfId, friendId) => {
    const recordFound = await FriendRecord.findOne({selfId, friendId});
    if (recordFound) {
        await FriendRecord.findOneAndUpdate({selfId, friendId},
            {status: 'PENDING'});
    } else {
        const record = new FriendRecord({selfId, friendId});
        await record.save();
    }
};

const changeRequestStatus = async (selfId, friendId, status) => {
    await FriendRecord.findOneAndUpdate({
        selfId: friendId,
        friendId: selfId,
    }, {status});
};

const deleteFriendForUser = async (selfId, friendId) => {
    await FriendRecord.findOneAndDelete({
        $or: [
            {selfId, friendId},
            {selfId: friendId, friendId: selfId},
        ]});
};

const deleteUserFriends = async (id) => {
    await FriendRecord.deleteOne({
        $or: [
            {selfId: id},
            {friendId: id},
        ]});
};

const isFriendForUser = async (userId, possibleFriend) => {
    const record = await FriendRecord
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
    getFriendsByUsernameForUser,
    addFriendsInfoToRecords,
};

