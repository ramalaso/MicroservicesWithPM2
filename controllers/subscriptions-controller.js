const router = require('express').Router();
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper;
const SubscriptionService = require('../services/subscriptions-service');

const subscriptionService = new SubscriptionService();


router.get('/', asyncWrapper(async (req, res) => {
    let userId = null;
    let plans = await subscriptionService.findAll(userId);
    res.send(plans);
}));

router.get('/:id', asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let userId = null;
    let plan = await subscriptionService.findOne(id);
    res.send(plan);
}));

router.post('/', asyncWrapper(async (req, res) => {
    let plan = await subscriptionService.create(req.body);
    res.send(plan);

}));

router.delete('/:id', asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await subscriptionService.deleteOne(id);
    res.sendStatus(200);
}));

module.exports = router;