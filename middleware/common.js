const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');


module.exports = function CommonMiddleware(app) {
    app.use(express.json());
    app.use(morgan('common'));
    app.use(cors());
    app.use(helmet());
};