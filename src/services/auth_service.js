const jwt = require('jsonwebtoken');
const {User} = require('../models/user_model');
const {InvalidCredentialsError} = require('../utils/errors');
const {getUserByEmail} = require('./../services/users_service');
const {checkIfPasswordsMatch,
    encryptPassword} = require('../utils/password_processing');
const {registrationSchema} = require('../utils/validation/auth/registration_schema');

const validateCredentials = async (credentials) => {
    try {
        await registrationSchema.validateAsync(credentials);
    } catch (e) {
        throw new InvalidCredentialsError(e.message);
    }
};

const getTokenForUser = (user) => {
    const SECRET = process.env.TOKEN_SECRET;
    return jwt.sign({
        _id: user._id,
        role: user.role,
    }, SECRET);
};

const getUserByCredentials = async (email, password) => {
    const user = await getUserByEmail(email);
    await checkIfPasswordsMatch(password, user.password);
    return user;
};

const signUp = async (credentials) => {
    await validateCredentials(credentials);
    const {email, password, username} = credentials;
    const passwordEncrypted = await encryptPassword(password);
    try {
        const user = new User({
            email,
            username,
            password: passwordEncrypted,
        });
        await user.save();
    } catch (e) {
        throw new InvalidCredentialsError(e.message);
    }
};

const signIn = async ({email, password}) => {
    const user = await getUserByCredentials(email, password);
    return getTokenForUser(user);
};

module.exports = {
    signUp,
    signIn
};
