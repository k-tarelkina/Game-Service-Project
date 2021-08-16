const mongoose = require('mongoose');

const TAGS = ['INDIE', 'ACTION', 'ADVENTURE'];

const Tag = new mongoose.Schema({
    value: {
        type: String,
        uppercase: true,
        enum : TAGS
    }
});

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
    },
    tags: {
        type: [Tag]
    }
});

module.exports = {Game};
