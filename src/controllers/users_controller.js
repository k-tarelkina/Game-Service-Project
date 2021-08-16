const express = require('express');
const {authMiddleware} = require('../middlewares/auth_middleware');
const {getUserById,
    deleteUserById,
    updateUserById,
} = require('./../services/users_service');
const {asyncWrapper} = require('./../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(authMiddleware);

router.get('/me', asyncWrapper(async (req, res) => {
    const user = await getUserById(req.user._id);
    res.status(200).json({user});
}));

router.delete('/me', asyncWrapper(async (req, res) => {
    const {user} = req;
    await deleteUserById(user._id);
    res.status(200).json({message: 'Success'});
}));

router.patch('/me', asyncWrapper(async (req, res) => {
    const {user} = req;
    await updateUserById(user._id, req.body);
    res.status(200).json({message: 'Success'});
}));

module.exports = {
    usersRouter: router,
};
