const { Router } = require('express');

const routes = Router();

const { index, update } = require('./controllers/ProfileController');
const { jobControl } = require('./services/jobControl');

// routes
routes.get('/', jobControl.controllers.index);
routes.get('/job', jobControl.controllers.create);
routes.post('/job', jobControl.controllers.save);
routes.get('/job/:id', jobControl.controllers.show);
routes.post('/job/:id', jobControl.controllers.update);
routes.post('/job/delete/:id', jobControl.controllers.delete);
routes.get('/profile', index);
routes.post('/profile', update);

module.exports = routes;
