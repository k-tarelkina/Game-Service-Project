const {Game} = require('./../../models/game_model');
const {formatGames} = require('./games_formatting');
const {getSearchRegExp} = require('../../utils/reg_exp');
const {formatGame} = require('./games_formatting');


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

const getAllGames = async (userId) => {
    const games = await Game.find({});
    return formatGames({games, userId});
};

const getGamesByOptions = async (options, userId) => {
    const formattedOptions = formatOptions(options);
    const games = await Game.find(formattedOptions);
    return formatGames({games, userId});
};

const addGame = async (data) => {
    const game = new Game(data);
    await game.save();
};

module.exports = {
    getGameById,
    getGamesByIds,
    getAllGames,
    getGamesByOptions,
    addGame,
};