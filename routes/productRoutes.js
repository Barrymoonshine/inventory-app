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

const routes = express.Router();

routes.get('/product-details/:id', product_get_view);
routes.get('/edit-product/:id', product_get_edit);
routes.get('/delete-product/:id', product_get_delete);
routes.delete(
  '/:id',
  passwordChecker(process.env.ADMIN_PASSWORD),
  product_delete
);
routes.post('/', upload.single('productImage'), product_post);
routes.put(
  '/:id',
  passwordChecker(process.env.ADMIN_PASSWORD),
  upload.single('productImage'),
  product_put
);

export default routes;
