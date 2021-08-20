const express = require('express');
const {getGameById, addGame, getGamesByOptions, getAllGamesTags} =
    require('../services/games_services/games_service');
const {authMiddleware} = require('../middlewares/auth_middleware');
const {asyncWrapper} = require('./../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(authMiddleware);

router.get('/', asyncWrapper(async (req, res) => {
    const games = await getGamesByOptions(req.query, req.user._id);
    res.status(200).json(games);
}));

router.get('/tags', asyncWrapper(async (req, res) => {
    const tags = getAllGamesTags();
    res.status(200).json(tags);
}));

router.get('/:id', asyncWrapper(async (req, res) => {
    const {id} = req.params;
    const game = await getGameById(id, req.user._id);
    res.status(200).json(game);
}));

router.post('/', asyncWrapper(async (req, res) => {
    await addGame(req.body);
    res.status(200).json({message: 'Success'});
}));

module.exports = {
    gamesRouter: router,
};
