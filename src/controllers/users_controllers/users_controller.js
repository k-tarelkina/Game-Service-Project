const express = require('express');
const {friendsRouter} = require("./friends_controller");
const {selfUserRouter} = require("./self_user_controller");
const {authMiddleware} = require('../../middlewares/auth_middleware');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(authMiddleware);

router.use('/me', selfUserRouter);

// @TODO search by username
module.exports = {
    usersRouter: router,
};
