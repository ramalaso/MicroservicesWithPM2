const Joi = require('joi');
const Subscription = require('../models/subscription');
const Plan = require('../models/plan');

let validators = {
    "Subscription": {
        scopes: {
            default: Subscription.SubscriptionValidationSchema
        }
    },
    "Plan": {
        scopes: {
            default: Plan.PlanValidationSchema
        }
    }
};

function scopeExists(validator, scope) {
    return Object.keys(validator.scopes).find(key => key == scope) != undefined;
}

// scopeExists(validators.Subscription, 'default');
// scopeExists(vlidators.Subscription, 'update');

function getSchema(model, scope) {
    let validator = validators[model];
    if (!validator) {
        throw new Error('Validator does not exist');
    }

    if (validator.scopes) {
        if (scope) {
            if (!scopeExists(validator, scope)) {
                throw new Error(`Scope ${scope} does not exist in $ ${model} validator`);
            }
            else {
                return validator.scope[scope];
            }
        } else {
            return validator.scopes.default;
        }
    } else {
        return validator;
    }
}

function validate(model, object, scope) {
    return Joi.validate(object, getSchema(model, scope), {
        allowUnknown: true,
    });
}

module.exports = function ValidationMiddleware(model, scope) {
    return (req, res, next) => {
        const validationResult = validate(model, req.body, scope);
        if (validationResult.error) {
            throw new Error(validationResult.error.message);
        } else {
            next();
        }
    };
};