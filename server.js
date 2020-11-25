const express = require('express');
const PORT = process.env.PORT || 3000;
const PlansController = require('./controllers/plans-controller');
const SubscriptionsController = require('./controllers/subscriptions-controller');


const app = express();


app.use('/api/plans', PlansController);
app.use('/api/subscriptions', SubscriptionsController);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});