import express from 'express';
import {
  category_add,
  category_post,
} from '../controllers/categoryController.js';

const routes = express.Router();

routes.get('/add-category', category_add);

routes.post('/categories', category_post);

export default routes;
