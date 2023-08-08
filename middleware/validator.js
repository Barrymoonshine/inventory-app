import { check, validationResult } from 'express-validator';

const addProdValidation = () => [
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
  check('quantity')
    .isNumeric()
    .notEmpty()
    .withMessage('Please enter a quantity'),
  check('category')
    .isString()
    .notEmpty()
    .withMessage('Please select a value category'),
];

const editProdValidation = () => [
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
      if (value === '0' || value === '0.0' || value === '0.00') {
        return false;
      }
      return true;
    })
    .withMessage('Price must be above £0'),
  check('quantity')
    .isNumeric()
    .notEmpty()
    .withMessage('Please enter a quantity'),
  check('category')
    .isString()
    .notEmpty()
    .withMessage('Please select a value category'),
  check('password')
    .custom((value) => {
      console.log('process.env.ADMIN_PASSWORD', process.env.ADMIN_PASSWORD);
      console.log('password value', value);
      if (value === process.env.ADMIN_PASSWORD) {
        return true;
      }
      return false;
    })
    .withMessage('Please enter a valid password'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json(errors.array());
};

export { addProdValidation, editProdValidation, validate };
