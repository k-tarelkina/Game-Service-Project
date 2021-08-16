const express = require('express');
const {friendsRouter} = require("./friends_controller");
const {selfUserRouter} = require("./self_user_controller");
const {authMiddleware} = require('../../middlewares/auth_middleware');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(authMiddleware);

router.use('/me', selfUserRouter);
router.use('/friends', friendsRouter);

module.exports = {
    usersRouter: router,
};
