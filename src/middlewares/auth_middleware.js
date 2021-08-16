const jwt = require('jsonwebtoken');

const getToken = (authorizationHeader) => {
    // Authorization: <type> <credentials>
    return authorizationHeader.split(' ')[1];
};

const addUserDataToReq = (req, token) => {
    const SECRET = process.env.TOKEN_SECRET;
    const payload = jwt.verify(token, SECRET);
    req.user = {
        _id: payload._id
    };
};

const authMiddleware = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res
            .status(400)
            .json({message: 'No authorization header provided'});
    }
    const token = getToken(authorization);
    if (!token) {
        return res.status(400).json({message: 'No token provided'});
    }
    try {
        addUserDataToReq(req, token);
        next();
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {authMiddleware};
