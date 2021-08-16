class GamesServiceError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
    }
}

class InvalidCredentialsError extends GamesServiceError {
    constructor(message = 'Invalid credentials') {
        super(message);
        this.status = 400;
    }
}

module.exports = {
    GamesServiceError,
    InvalidCredentialsError
};
