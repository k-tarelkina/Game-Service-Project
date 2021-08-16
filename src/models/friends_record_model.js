const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const FriendsRecord = mongoose.model('Friends_Record', {
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
