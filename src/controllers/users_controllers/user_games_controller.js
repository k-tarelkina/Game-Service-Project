const express = require('express');
const {asyncWrapper} = require('../../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', asyncWrapper(async (req, res) => {

}));

module.exports = {
    gamesRouter: router,
};
