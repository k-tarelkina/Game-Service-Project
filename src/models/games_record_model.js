const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const GamesRecord = mongoose.model('Games_Record', {
    selfId: {
        type: ObjectId,
        required: true,
        unique: true,
    },
    gamesId: {
        type: [ObjectId],
        default: [],
    },
});

module.exports = {GamesRecord};
