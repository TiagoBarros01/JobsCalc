const { Router } = require('express');

const routes = Router();

const { jobControl } = require('./services/jobControl');
const Profile = require('./services/Profile');

// routes
routes.get('/', jobControl.controllers.index);
routes.get('/job', jobControl.controllers.create);
routes.post('/job', jobControl.controllers.save);
routes.get('/job/:id', jobControl.controllers.show);
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
