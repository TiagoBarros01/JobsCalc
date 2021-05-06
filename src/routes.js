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
  valueHour: 75,
};

const jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    dailyHours: 2,
    totalHours: 3,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: 'OneTwo Project',
    dailyHours: 3,
    totalHours: 47,
    createdAt: Date.now(),
  },
];

function remainingDays(job) {
  const missingDay = Math.round(job.totalHours / job.dailyHours);

  const createdDate = new Date(job.createdAt);
  const dueDay = createdDate.getDate() + Number(missingDay);
  const dueDate = createdDate.setDate(dueDay);

  const timeDiffInMs = dueDate - Date.now();

  const dayInMs = 1000 * 60 * 60 * 24;
  const dayDiff = Math.floor(timeDiffInMs / dayInMs);

  return dayDiff;
}

// routes
routes.get('/', (req, res) => {
  const updatedJobs = jobs.map((job) => {
    const remaining = remainingDays(job);
    const status = remaining <= 0 ? 'done' : 'progress';

    return {
      ...job,
      remaining,
      status,
      budget: profile.valueHour * job.totalHours,
    };
  });

  return res.render(`${views}index`, { profile, jobs: updatedJobs });
});
routes.get('/job', (req, res) => res.render(`${views}job`));

routes.post('/job', (req, res) => {
  const job = req.body;

  const lastId = jobs[jobs.length - 1]?.id || 1;

  jobs.push({
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
