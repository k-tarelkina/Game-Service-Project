const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const FRIEND_REQUEST_STATUS = [
    'PENDING',
    'ACCEPTED',
    'REJECTED',
];

const FriendsRecord = mongoose.model('Friends_Record', {
    selfId: {
        type: ObjectId,
        required: true,
    },
    friendsId: {
        type: ObjectId,
        required: true,
    },
    status: {
        type: String,
        uppercase: true,
        enum: FRIEND_REQUEST_STATUS,
        default: 'PENDING',
    },
});

module.exports = {FriendsRecord};
