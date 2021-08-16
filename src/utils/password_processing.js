const bcrypt = require('bcrypt');
const {InvalidCredentialsError} = require('./errors');

const checkIfPasswordsMatch = async (plainPassword, hash) => {
    const passwordMatches = await bcrypt.compare(plainPassword, hash);
    if (!passwordMatches) {
        throw new InvalidCredentialsError();
    }
};

const encryptPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

module.exports = {
    checkIfPasswordsMatch,
    encryptPassword,
};
