const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const FriendsRecord = mongoose.model('FriendsRecord', {
    selfId: {
        type: ObjectId,
        required: true
    },
    friendsId: [ObjectId]
});

module.exports = {FriendsRecord};
