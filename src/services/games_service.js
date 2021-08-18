const {hasUserGame} = require('./users_services/user_games_service');
const {getSearchRegExp} = require('../utils/reg_exp');
const {Game} = require('../models/game_model');

const addFlagForUser = async (userId, ...games) => {
    for (let i = 0; i < games.length; i += 1) {
        games[i].addedToCurrentUser = await hasUserGame(userId, games[i]._id);
    }
};

const formatOptions = (options) => {
    const formattedOptions = {};
    const {name, price, tags} = options;
    if (name) {
        formattedOptions.name = {$regex: getSearchRegExp(name)};
    }
    if (price) {
        formattedOptions.price = {$lte: price};
    }
    if (tags) {
        formattedOptions.tags = {$in: tags};
    }
    return formattedOptions;
};

const formatGame = async ({game, userId}) => {
    const gameObj = extractGameObject(game);
    await addFlagForUser(userId, gameObj);
    return gameObj;
};

const formatGames = async ({games, userId}) => {
    const formatted = [];
    for (const game of games) {
        formatted.push(await formatGame(game));
    }
    return formatted;
};

const extractGameObject = (game) => {
    return game._doc;
};

const getGameById = async (gameId, userId) => {
    const game = await Game.findOne({_id: gameId});
    return formatGame({game, userId});
};

const getGamesByIds = async (ids) => {
    const games = [];
    for (const id of ids) {
        const game = await getGameById(id);
        games.push(game);
    }
    return games;
};

const addGame = async (data) => {
    const game = new Game(data);
    await game.save();
};

const getAllGames = async () => {
    const games = await Game.find({});
    return formatGames(games);
};

const getGamesByOptions = async (options) => {
    const formattedOptions = formatOptions(options);
    const games = await Game.find(formattedOptions);
    return formatGames(games);
};

module.exports = {
    getGameById,
    getGamesByIds,
    addGame,
    getAllGames,
    getGamesByOptions,
};
