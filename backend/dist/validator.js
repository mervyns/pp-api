"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userValidationRules = () => {
    return [
        // password must be at least 5 chars long
        express_validator_1.body('id').isLength({ min: 1 }).withMessage('Missing ID'),
        express_validator_1.body('type').isIn(['credit', 'debit']).withMessage('Type must be credit or debit'),
        express_validator_1.body('amount').isInt().withMessage('Missing ID'),
        express_validator_1.body('currency').isLength({ min: 3 }).withMessage('Currency must be 3 Characters'),
    ];
};
const validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
module.exports = {
    userValidationRules,
    validate,
};
//# sourceMappingURL=validator.js.map