import { check, validationResult } from 'express-validator';

const addProdValidationRules = () => [check('name').notEmpty()];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log('Validation errors:', errors.array());
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { addProdValidationRules, validate };
