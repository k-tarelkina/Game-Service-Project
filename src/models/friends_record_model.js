const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const FRIEND_REQUEST_STATUS = [
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'EMPTY',
];

const FriendRecord = mongoose.model('Friend_Record', {
    selfId: {
        type: ObjectId,
        required: true,
        unique: false,
    },
    friendId: {
        type: ObjectId,
        required: true,
        unique: false,
    },
    status: {
        type: String,
        uppercase: true,
        enum: FRIEND_REQUEST_STATUS,
        default: 'PENDING',
    },
});

module.exports = {FriendRecord};
