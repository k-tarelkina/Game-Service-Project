const {Game} = require('../models/game_model');

const formatOptions = (options) => {
    const formattedOptions = {};
    const {price, tags} = options;
    if (price) {
        formattedOptions.price = { $lte: price};
    }
    if (tags) {
        formattedOptions.tags = {$in: tags};
    }
    return formattedOptions;
}

const getGameById = async (id) => {
    return Game.findOne({_id: id});
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
    return Game.find({});
}

const getGamesByOptions = async (options) => {
    const formattedOptions = formatOptions(options);
    return Game.find(formattedOptions);
}

module.exports = {
    getGameById,
    getGamesByIds,
    addGame,
    getAllGames,
    getGamesByOptions
}
