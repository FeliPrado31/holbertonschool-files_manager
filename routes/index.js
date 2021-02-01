import AppController from '../controllers/AppController';

const express = require('express');
const { postNew } = require('../controllers/UsersController');

const router = (app) => {
  const route = express.Router();
  app.use(express.json());
  app.use('/', route);

  // app routes
  route.get('/status', (request, response) => AppController.getStatus(request, response));

  route.get('/stats', (request, response) => AppController.getStats(request, response));

  // user routes
  router.post('/users', (req, res) => postNew(req, res));
};
export default router;
