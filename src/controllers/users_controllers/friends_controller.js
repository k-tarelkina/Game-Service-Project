const express = require('express');
const {getFriendsByUserId,
    deleteFriendForUser,
    addFriendToUser,
} = require('../../services/friends_service');
const {asyncWrapper} = require('../../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('', asyncWrapper(async (req, res) => {
    const users = await getFriendsByUserId(req.user._id);
    res.status(200).json({users});
}));

router.put('/:friendId', asyncWrapper(async (req, res) => {
    const {friendId} = req.params;
    await addFriendToUser(req.user._id, friendId);
    res.status(200).json({message: 'The friend has been added'});
}));

router.delete('/:friendId', asyncWrapper(async (req, res) => {
    const {friendId} = req.params;
    await deleteFriendForUser(req.user._id, friendId);
    res.status(200).json({message: 'The friend has been deleted'});
}));

module.exports = {
    friendsRouter: router,
};
