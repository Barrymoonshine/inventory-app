import { check, validationResult } from 'express-validator';

const addProdValidationRules = () => [
  check('name').isString().notEmpty().withMessage('Please enter a valid name'),
  check('sku')
    .isString()
    .notEmpty()
    .withMessage('Please enter a valid SKU reference'),
  check('description')
    .isString()
    .notEmpty()
    .withMessage('Please enter a valid description'),
  check('price')
    .isNumeric()
    .notEmpty()
    .custom((value) => value !== 0.0)
    .withMessage('Price must not be £0.00'),
  check('quantity')
    .isNumeric()
    .notEmpty()
    .withMessage('Please enter a quantity of 1 or higher'),
  check('category')
    .isString()
    .notEmpty()
    .withMessage('Please select a value category'),
];

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
