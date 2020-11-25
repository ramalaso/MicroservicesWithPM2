const chalk = require('chalk');
const { AuthenticationError } = require('../errors/errors');
const ValidationError = require('../errors/errors').ValidationError;
const AccessDeniedError = require('../errors/errors').AccessDeniedError;

function errorLogger(error, req, res, next) {
    if (error.message) {
        console.log(chalk.red(error.message));
    }
    if (error.stack) {
        console.log(chalk.red(error.message));
    }
    next();
}

function authenticationErrorHandler(error, req, res, next) {
    if (error instanceof AuthenticationError) {
        return res.sendStatus(401);
    }
    next(error);
}

function validationErrorHandler(error, req, res, next) {
    if (error instanceof ValidationError) {
        return res.sendStatus(400);
    }
    next(error);
}

function accessDeniedErrorHandler(error, req, res, next) {
    if (error instanceof AccessDeniedError) {
        return res.sendStatus(403);
    }
    next(error);
}

function genericErrorHandler(error, req, res, next) {
    res.sendStatus(500);
    next();
}

module.exports = function ErrorhandlingMiddleware(app) {
    app.use([
        errorLogger,
        authenticationErrorHandler,
        validationErrorHandler,
        accessDeniedErrorHandler,
        genericErrorHandler
    ]);
};
