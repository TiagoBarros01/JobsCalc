const { Router } = require('express');

const routes = Router();

// basepath
const views = `${__dirname}/views/`;

const profile = {
  name: 'Tiago',
  avatar: 'https://www.github.com/tiagobarros01.png',
  monthlyBudget: 3000,
  daysPerWeek: 5,
  hoursPerDay: 6,
  vacationPerYear: 5,
};

const jobs = [];

// routes
routes.get('/', (req, res) => res.render(`${views}index`, { profile }));
routes.get('/job', (req, res) => res.render(`${views}job`));

routes.post('/job', (req, res) => {
  const job = req.body;
  job.createdAt = Date.now();

  jobs.push({
    name: job.name,
    dailyHours: '',
  });
  return res.redirect('/');
});

routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));
routes.get('/profile', (req, res) => res.render(`${views}profile`, { profile }));

module.exports = routes;
