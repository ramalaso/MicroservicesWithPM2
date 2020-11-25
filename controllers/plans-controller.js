const router = require('express').Router();
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper;
const PlanService = require('../services/plans-service');
const validator = require('../middleware/validator');

const planService = new PlanService();


router.get('/', asyncWrapper(async (req, res) => {
    let userId = null;
    let plans = await planService.findAll(userId);
    res.send(plans);
}));

router.get('/:id', asyncWrapper(async (req, res) => {
    let id = req.params.id;
    let userId = null;
    let plan = await planService.findOne(id);
    res.send(plan);
}));

router.post('/', [validator('Plan')], asyncWrapper(async (req, res) => {
    let plan = await planService.create(req.body);
    res.send(plan);

}));

router.delete('/:id', asyncWrapper(async (req, res) => {
    let id = req.params.id;
    await plansService.deleteOne(id);
    res.sendStatus(200);
}));

module.exports = router;