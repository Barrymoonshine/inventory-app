import express from 'express';
import multer from 'multer';
import Product from '../models/products.js';
import {
  product_get_view,
  product_get_edit,
  product_delete,
  product_post,
  product_put,
} from '../controllers/productController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage });

// Set up an Express router, router has to be used inside an app
const routes = express.Router();

// Display selected product to view
routes.get('/product-details/:id', product_get_view);

// Display selected product to edit
routes.get('/edit-product/:id', product_get_edit);

// Delete product
routes.delete('/:id', product_delete);

// Add new product to DB
routes.post('/', upload.single('productImage'), product_post);

// Edit product in DB
routes.put('/:id', product_put);

export default routes;
