const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const FriendsRecord = mongoose.model('FriendsRecord', {
    selfId: {
        type: ObjectId,
        required: true,
        unique: true
    },
    friendsId: {
        type: [ObjectId],
        default: []
    }
});

module.exports = {FriendsRecord};
