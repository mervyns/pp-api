import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

const userValidationRules = () => {
  return [
    // password must be at least 5 chars long
    body('id').isLength({ min: 1 }).withMessage('Missing ID'),
    body('type').isIn(['credit', 'debit']).withMessage('Type must be credit or debit'),
    body('amount').isInt().withMessage('Missing ID'),
    body('currency').isLength({ min: 3 }).withMessage('Currency must be 3 Characters'),
  ]
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: Array<any> = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}
