const {getGamesByIds} = require("../games_service");
const {GamesRecord} = require('../../models/games_record_model');

const getUserRecordById = async (id) => {
    return GamesRecord.findOne({selfId: id});
};

const getGamesByUserId = async (id) => {
    const {gamesId} = await getUserRecordById(id);
    return getGamesByIds(gamesId);
};

const addGameToUser = async (selfId, gameId) => {
    const self = await GamesRecord.findOne({selfId});
    if (!self) {
        const newRecord = new GamesRecord({selfId, gamesId: [gameId]});
        await newRecord.save();
    } else {
        await GamesRecord.findOneAndUpdate({selfId}, { $push: {gamesId: gameId}});
    }
}

const deleteUserGamesRecord = async (id) => {
    await GamesRecord.deleteOne({selfId: id});
};

module.exports = {
    getGamesByUserId,
    addGameToUser,
    deleteUserGamesRecord
}
