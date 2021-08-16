const express = require('express');
const {register, login} = require('../services/auth_service');
const {asyncWrapper} = require('./../utils/async_wrapper');

const router = express.Router();

router.post('/sign_up', asyncWrapper(async (req, res) => {
    await register(req.body);
    res.status(200).json({message: 'Success'});
}));

router.post('/sign_in', asyncWrapper(async (req, res) => {
    const token = await login(req.body);
    res.status(200).json({
        message: 'Success',
        jwt_token: token,
    });
}));

module.exports = {
    authRouter: router,
};