const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const Friends = mongoose.model('Friends', {
    selfId: {
        type: ObjectId,
        required: true
    },
    friendsId: [ObjectId]
});

module.exports = {Friends};
