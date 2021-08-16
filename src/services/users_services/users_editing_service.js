const {encryptPassword} = require("../../utils/password_processing");
const {User} = require("../../models/user_model");
const {deleteUserGamesRecord} = require("./user_games_service");
const {deleteUserFriendsRecord} = require("./friends_service");

const deleteUserById = async (id) => {
    await User.deleteOne({_id: id});
    await deleteUserFriendsRecord(id);
    await deleteUserGamesRecord(id);
};

const updateUserById = async (id, data) => {
    if (data.password) {
        data.password = await encryptPassword(data.password);
    }
    return User.updateOne({_id: id}, data);
};

module.exports = {
    deleteUserById,
    updateUserById,
};
