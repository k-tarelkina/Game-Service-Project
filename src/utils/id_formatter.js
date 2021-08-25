const mongoose = require('mongoose');

const getIdFromString = (idString) => {
    // eslint-disable-next-line new-cap
    return mongoose.Types.ObjectId(idString);
};

module.exports = {
    getIdFromString,
};
