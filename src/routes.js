const { Router } = require('express');

const routes = Router();

// basepath
const views = require('./basePath');
const { jobControl, profile } = require('./services/jobControl');

// routes
routes.get('/', jobControl.controllers.index);
routes.get('/job', (req, res) => res.render(`${views}job`));

routes.post('/job', (req, res) => {
  const job = req.body;

  const lastId = jobControl.data[jobControl.data.length - 1]?.id || 1;

  jobControl.data.push({
    id: lastId + 1,
    name: job.name,
    dailyHours: job.dailyHours,
    totalHours: job.totalHours,
    createdAt: Date.now(),
  });
  return res.redirect('/');
});

routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));
routes.get('/profile', (req, res) => res.render(`${views}profile`, { profile }));

module.exports = routes;
