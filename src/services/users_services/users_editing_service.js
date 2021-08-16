const deleteUserById = async (id) => {
    await User.deleteOne({_id: id});
    await deleteUserRecord(id);
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
