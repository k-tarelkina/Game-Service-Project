const {GamesRecord} = require('../../models/games_record_model');

const getGameForUser = async (userId, gameId) => {
    return GamesRecord.findOne({selfId: userId, gamesId: gameId});
};

const hasUserGame = async (userId, gameId) => {
    const game = await getGameForUser(userId, gameId);
    return !!game;
};

const addFlagForUser = async (userId, ...games) => {
    for (let i = 0; i < games.length; i += 1) {
        games[i].addedToCurrentUser = await hasUserGame(userId, games[i]._id);
    }
};

const extractGameObject = (game) => {
    return game._doc;
};

const formatGame = async ({game, userId}) => {
    const gameObj = extractGameObject(game);
    await addFlagForUser(userId, gameObj);
    return gameObj;
};

const formatGames = async ({games, userId}) => {
    const formatted = [];
    for (const game of games) {
        formatted.push(await formatGame({game, userId}));
    }
    return formatted;
};

module.exports = {
    formatGame,
    formatGames,
};
