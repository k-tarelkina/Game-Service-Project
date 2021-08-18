const express = require('express');
const {gamesRouter} = require('./user_games_controller');
const {friendsRouter} = require('./friends_controller');
const {getUserById} = require('../../services/users_services/users_getter_service');
const {
    deleteUserById,
    updateUserById,
} = require('../../services/users_services/users_editing_service');
const {asyncWrapper} = require('../../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();
router.use('/friends', friendsRouter);
router.use('/games', gamesRouter);

router.get('/', asyncWrapper(async (req, res) => {
    const user = await getUserById(req.user._id);
    res.status(200).json(user);
}));

router.delete('/', asyncWrapper(async (req, res) => {
    const {user} = req;
    await deleteUserById(user._id);
    res.status(200).json({message: 'Success'});
}));

router.patch('/', asyncWrapper(async (req, res) => {
    const {user} = req;
    await updateUserById(user._id, req.body);
    res.status(200).json({message: 'Success'});
}));

module.exports = {
    selfUserRouter: router,
};
