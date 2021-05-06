const { Router } = require('express');

const routes = Router();

// basepath
const views = require('./basePath');
const { jobControl } = require('./services/jobControl');
const Profile = require('./services/Profile');

// routes
routes.get('/', jobControl.controllers.index);
routes.get('/job', jobControl.controllers.create);
routes.post('/job', jobControl.controllers.save);
routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));
routes.get('/profile', Profile.controllers.index);

module.exports = routes;
