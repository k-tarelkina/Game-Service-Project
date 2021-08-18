const mongoose = require('mongoose');

const TAGS = [
    'INDIE',
    'ACTION',
    'ADVENTURE',
    'CASUAL',
    'SIMULATION',
    'STRATEGY',
    'RPG',
    'SINGLE-PLAYER',
];

const Game = mongoose.model('Game', {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    picture: {
        type: String,
        required: false,
    },
    created_date: {
        type: Date,
        default: Date.now(),
    },
    tags: {
        type: [{
            type: String,
            uppercase: true,
            enum: TAGS,
        }],
    },
});

module.exports = {Game};
