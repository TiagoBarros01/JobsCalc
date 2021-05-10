const { Router } = require('express');

const routes = Router();

const JobController = require('./controllers/JobController');
const ProfileController = require('./controllers/ProfileController');

// routes
routes.get('/', JobController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;
