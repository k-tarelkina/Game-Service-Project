const {Game} = require('../models/game_model');


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

module.exports = {
    getGameById,
    getGamesByIds
}
