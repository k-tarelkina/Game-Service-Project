const express = require('express');
const {signUp, signIn} = require('../services/auth_service');
const {asyncWrapper} = require('./../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/sign_up', asyncWrapper(async (req, res) => {
    await signUp(req.body);
    res.status(200).json({message: 'Success'});
}));

router.post('/login', asyncWrapper(async (req, res) => {
    const user = await signIn(req.body);
    res.status(200).json({
        message: 'Success',
        user,
    });
}));

module.exports = {
    authRouter: router,
};
