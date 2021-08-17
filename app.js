const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {gamesRouter} =
    require('./src/controllers/users_controllers/user_games_controller');
const {GamesServiceError} =
    require('./src/utils/errors');
const {authRouter} = require('./src/controllers/auth_controller');
const {usersRouter} =
    require('./src/controllers/users_controllers/users_controller');

const app = express();

app.use(logger('dev'));
app.use(cors()); // Enable All CORS Requests
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'game-service-ui/dist/game-service-ui')));

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'game-service-ui/dist/game-service-ui/index.html'),
    );
});
app.use('/api/auth', authRouter);
// for the next routers, auth is required:
app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);

app.use((req, res, next) => {
    res.status(404).json({message: 'Not found'});
});

app.use((err, req, res, next) => {
    if (err instanceof GamesServiceError) {
        return res.status(err.status).json({message: err.message});
    }
    res.status(500).json({message: err.message});
});

module.exports = app;
