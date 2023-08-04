import express from 'express';
import {
  product_get_view,
  product_get_edit,
  product_get_delete,
  product_delete,
  product_post,
  product_put,
} from '../controllers/productController.js';
import upload from '../services/mutler.js';
import passwordChecker from '../services/passwordChecker.js';

// Set up an Express router, router has to be used inside an app
const routes = express.Router();

// Display selected product to view
routes.get('/product-details/:id', product_get_view);

// Display selected product to edit
routes.get('/edit-product/:id', product_get_edit);

// Display selected product to delete
routes.get('/delete-product/:id', product_get_delete);

// Delete product
routes.delete(
  '/:id',
  passwordChecker(process.env.ADMIN_PASSWORD),
  product_delete
);

// Add new product to DB
routes.post('/', upload.single('productImage'), product_post);

// Edit product in DB
routes.put(
  '/:id',
  passwordChecker(process.env.ADMIN_PASSWORD),
  upload.single('productImage'),
  product_put
);

export default routes;
