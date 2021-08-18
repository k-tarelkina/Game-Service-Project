const express = require('express');
const {getGamesByUserId, addGameToUser, deleteUserGamesRecord} =
    require('../../services/games_services/user_games_service');
const {asyncWrapper} = require('../../utils/async_wrapper');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', asyncWrapper(async (req, res) => {
    const games = await getGamesByUserId(req.user._id);
    res.status(200).json(games);
}));

router.put('/:gameId', asyncWrapper(async (req, res) => {
    const {gameId} = req.params;
    await addGameToUser(req.user._id, gameId);
    res.status(200)
        .json({
            message: 'The game has been added to the library successfully',
        });
}));

router.delete('/:gameId', asyncWrapper(async (req, res) => {
    const {gameId} = req.params;
    await deleteUserGamesRecord(req.user._id, gameId);
    res.status(200)
        .json({
            message: 'The game has been deleted from the library successfully',
        });
}));

module.exports = {
    gamesRouter: router,
};
