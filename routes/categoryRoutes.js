import express from 'express';
import {
  category_add,
  category_post,
} from '../controllers/categoryController.js';

const routes = express.Router();

routes.get('/', category_add);

routes.post('/', category_post);

export default routes;
