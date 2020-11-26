const express = require('express');
const dotenv = require('dotenv');
const PlansController = require('./controllers/plans-controller');
const Middleware = require('../middleware/middleware');
const ErrorHandlingMiddlweare = require('../middleware/error-handling');

dotenv.config();
const PORT = process.env.PORT;

const app = express();

Middleware(app);
app.use('', PlansController);
ErrorHandlingMiddlweare(app);
app.listen(PORT, () => {
    console.log('Plans service is listening on port ' + PORT);
});