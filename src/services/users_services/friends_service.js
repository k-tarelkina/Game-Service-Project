const {FriendsRecord} = require('../../models/friends_record_model');

const changeRequestStatus = async (selfId, friendId, status) => {
    await FriendsRecord.findOneAndUpdate({selfId, friendId}, {status});
};

const getFriendsRequestsByUserId = async (userId) => {
    return FriendsRecord.find({
        $and: [
            {friendId: userId},
            {
                status: 'PENDING',
            },
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

const deleteFriendForUser = async (selfId, friendId) => {
    await FriendsRecord.findOneAndDelete({
        and$: [{
            $or: [
                {
                    $and: [{selfId}, {friendId}],
                },
                {
                    $and: [{selfId: friendId}, {friendId: selfId}],
                },
            ],
        },
        {status: 'ACCEPTED'}]});
};

const deleteUserFriends = async (id) => {
    await FriendsRecord.deleteOne({selfId: id});
};

module.exports = {
    getFriendsByUserId,
    addRequestForFriend,
    deleteFriendForUser,
    deleteUserFriends,
    getFriendsRequestsByUserId,
    changeRequestStatus,
};
