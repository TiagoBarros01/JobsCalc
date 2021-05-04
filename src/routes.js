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

// routes
routes.get('/', (req, res) => res.render(`${views}index`, { profile }));
routes.get('/job', (req, res) => res.render(`${views}job`));
routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));
routes.get('/profile', (req, res) => res.render(`${views}profile`, { profile }));

module.exports = routes;
