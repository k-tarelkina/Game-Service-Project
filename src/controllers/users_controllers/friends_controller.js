const express = require('express');
const {getUserById} = require('../../services/users_services/users_getter_service');
const {getFriendsByUserId,
    deleteFriendForUser,
    addRequestForFriend,
    changeRequestStatus,
    getFriendsRequestsToUserByStatus,
    getFriendsRequestsFromUserByStatus,
    getFriendsByUsernameForUser,
} = require('../../services/users_services/friends_service');
const {asyncWrapper} = require('../../utils/async_wrapper');

const getFriendsByParams = async (params) => {
    const {status, userAs = 'friend', username, currentUserId} = params;
    if (status && userAs) {
        if (userAs === 'friend') {
            return getFriendsRequestsToUserByStatus(currentUserId, status);
        } else { // userAs === 'self'
            return getFriendsRequestsFromUserByStatus(currentUserId, status);
        }
    } else if (username) {
        return getFriendsByUsernameForUser(currentUserId, username);
    }
    return getFriendsByUserId(currentUserId);
};

const addFriendsInfoToRecords = async (friendsRecords) => {
    const formattedFriends = [];
    for (const friendRecord of friendsRecords) {
        const friendRecordCopy = Object.assign({}, friendRecord._doc);
        const {friendId} = friendRecordCopy;
        const friend = await getUserById(friendId);
        const {_id, username} = friend;
        friendRecordCopy.friend = {_id, username};
        formattedFriends.push(friendRecordCopy);
    }
    return formattedFriends;
};

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', asyncWrapper(async (req, res) => {
    const friends = await getFriendsByParams(
        {...req.query, currentUserId: req.user._id});
    const formattedFriends = await addFriendsInfoToRecords(friends);
    res.status(200).json(formattedFriends);
}));

router.put('/:friendId', asyncWrapper(async (req, res) => {
    const {friendId} = req.params;
    await addRequestForFriend(req.user._id, friendId);
    res.status(200).json({message: 'The friend has been added'});
}));

router.patch('/:friendId', asyncWrapper(async (req, res) => {
    const {friendId} = req.params;
    const {status} = req.body;
    await changeRequestStatus(req.user._id, friendId, status);
    res.status(200).json(
        {message: `The friend\'s status has been changed to ${status}`});
}));

router.delete('/:friendId', asyncWrapper(async (req, res) => {
    const {friendId} = req.params;
    await deleteFriendForUser(req.user._id, friendId);
    res.status(200).json({message: 'The friend has been deleted'});
}));

module.exports = {
    friendsRouter: router,
};
