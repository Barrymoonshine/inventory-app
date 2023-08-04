import express from 'express';
import {
  dashboard_get,
  dashboard_post,
} from '../controllers/dashboardController.js';

const routes = express.Router();

routes.get('/', dashboard_get);

routes.post('/', dashboard_post);

export default routes;
