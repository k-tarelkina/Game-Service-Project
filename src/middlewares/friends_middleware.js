const {getUserById} =
    require('../services/users_services/users_getter_service');

const friendsMiddleware = async (req, res, next) => {
    const friendsRecords = [...req.body];
    if (friendsRecords.length === 0) {
        next();
    }
    for (let i = 0; i < friendsRecords.length; i += 1) {
        const {friendId} = friendsRecords[i];
        const friend = await getUserById(friendId);
        const {_id, name} = friend;
        friendsRecords[i].friend = {_id, name};
    }
    req.body = friendsRecords;
    next();
};

module.exports = {friendsMiddleware};
