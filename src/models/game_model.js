const mongoose = require('mongoose');

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
        default: null
    },
    created_date: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = {Game};
