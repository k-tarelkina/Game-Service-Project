const {TAGS} = require('../../models/game_model');
const {Game} = require('./../../models/game_model');
const {formatGames} = require('./games_formatting');
const {getSearchRegExp} = require('../../utils/reg_exp');
const {formatGame} = require('./games_formatting');


const formatOptions = (options) => {
    const formattedOptions = {};
    const {name, maxPrice, tags} = options;
    if (name) {
        formattedOptions.name = {$regex: getSearchRegExp(name), $options: 'i'};
    }
    if (maxPrice) {
        formattedOptions.price = {$lte: maxPrice};
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

const getGamesByIds = async (ids, userId) => {
    const games = [];
    for (const id of ids) {
        const game = await getGameById(id, userId);
        games.push(game);
    }
    return games;
};

const getAllGames = async (userId) => {
    const games = await Game.find({});
    return formatGames({games, userId});
};

const getAllGamesTags = () => {
    return TAGS;
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
    getAllGamesTags,
};
