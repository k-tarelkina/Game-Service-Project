const express = require('express');
const {friendsMiddleware} = require('../../middlewares/friends_middleware');
const {getFriendsByUserId,
    deleteFriendForUser,
    addRequestForFriend,
    changeRequestStatus,
    getFriendsRequestsToUserByStatus,
    getFriendsRequestsFromUserByStatus,
} = require('../../services/users_services/friends_service');
const {asyncWrapper} = require('../../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', asyncWrapper(async (req, res) => {
    const {status, userAs = 'friend'} = req.query;
    let users;
    if (status && userAs) {
        if (userAs === 'friend') {
            users = await
            getFriendsRequestsToUserByStatus(req.user._id, status);
        } else { // userAs === 'self'
            users = await
            getFriendsRequestsFromUserByStatus(req.user._id, status);
        }
    } else {
        users = await getFriendsByUserId(req.user._id);
    }
    res.status(200).json(users);
}));

router.use(friendsMiddleware);

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
