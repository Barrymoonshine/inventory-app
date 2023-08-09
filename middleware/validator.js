import { check, validationResult } from 'express-validator';

// File validation performed by Mutler

const formValidation = () => [
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
    .custom((value) => {
      // Gotcha - req.body parses all input fields as strings by default!
      if (value === '0' || value === '0.0' || value === '0.00') {
        return false;
      }
      return true;
    })
    .withMessage('Price must be above £0'),
  check('inStock')
    .custom((value, { req }) => {
      if (value === 'true' && req.body.quantity <= '0') {
        return false;
      }
      if (value === 'false') {
        return true;
      }
      return true;
    })
    .withMessage('Please enter a quantity above 0'),
  check('quantity')
    .isNumeric()
    .notEmpty()
    .withMessage('Please enter a quantity'),
  check('category')
    .isString()
    .notEmpty()
    .withMessage('Please select a value category'),
];

const passwordValidation = () => [
  check('password')
    .equals(process.env.ADMIN_PASSWORD)
    .withMessage('Please enter a valid password'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json(errors.array());
};

export { formValidation, passwordValidation, validate };
