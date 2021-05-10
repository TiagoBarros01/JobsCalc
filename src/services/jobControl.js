/* eslint-disable no-param-reassign */
const Profile = require('./Profile');

const jobControl = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      dailyHours: 3,
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
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = jobControl.data.map((job) => {
        const remaining = jobControl.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';

        return {
          ...job,
          remaining,
          status,
          budget: jobControl.services.calculateBudget(job, Profile.data.valueHour),
        };
      });

      return res.render('index', { profile: Profile.data, jobs: updatedJobs });
    },
    create(req, res) {
      return res.render('job');
    },
    save(req, res) {
      const job = req.body;

      const lastId = jobControl.data[jobControl.data.length - 1]?.id || 0;

      jobControl.data.push({
        id: lastId + 1,
        name: job.name,
        dailyHours: job.dailyHours,
        totalHours: job.totalHours,
        createdAt: Date.now(),
      });
      return res.redirect('/');
    },
    show(req, res) {
      const jobId = req.params.id;

      const job = jobControl.data.find((item) => Number(item.id) === Number(jobId));

      if (!job) {
        return res.send({ error: 'Job not found' });
      }

      job.budget = jobControl.services.calculateBudget(job, Profile.data.valueHour);

      return res.render('job-edit', { job });
    },
    update(req, res) {
      const jobId = req.params.id;

      const job = jobControl.data.find((item) => Number(item.id) === Number(jobId));

      if (!job) {
        return res.send({ error: 'Job not found' });
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        totalHours: req.body.totalHours,
        dailyHours: req.body.dailyHours,
      };

      jobControl.data = jobControl.data.map((item) => {
        if (Number(item.id) === Number(jobId)) {
          item = updatedJob;
        }

        return item;
      });

      return res.redirect(`/job/${jobId}`);
    },
    delete(req, res) {
      const jobId = req.params.id;

      jobControl.data = jobControl.data.filter((item) => Number(item.id) !== Number(jobId));

      return res.redirect('/');
    },
  },
  services: {
    remainingDays(job) {
      const missingDay = Math.round(job.totalHours / job.dailyHours);

      const createdDate = new Date(job.createdAt);
      const dueDay = createdDate.getDate() + Number(missingDay);
      const dueDate = createdDate.setDate(dueDay);

      const timeDiffInMs = dueDate - Date.now();

      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);

      return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job.totalHours,
  },
};

module.exports = { jobControl };
