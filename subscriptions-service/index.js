const express = require('express');
const dotenv = require('dotenv');
const SubscriptionsController = require('./controllers/subscriptions-controller');
const Middleware = require('../middleware/middleware');
const ErrorHandlingMiddlweare = require('../middleware/error-handling');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

Middleware(app);
app.use('', SubscriptionsController);

//Error middleware must be defined after all middlewares
ErrorHandlingMiddlweare(app);

app.listen(PORT, () => {
    console.log('Subscriptions service is listening on port ' + PORT);
});