const express = require('express');
const {getUsersByUsername} = require("../../services/users_services/users_getter_service");
const {asyncWrapper} = require("../../utils/async_wrapper");
const {selfUserRouter} = require("./self_user_controller");
const {authMiddleware} = require('../../middlewares/auth_middleware');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(authMiddleware);
router.use('/me', selfUserRouter);

router.get('/', asyncWrapper(async (req, res) => {
    const {username} = req.query;
    const users = await getUsersByUsername(username);
    res.status(200).json({users});
}));

module.exports = {
    usersRouter: router,
};
