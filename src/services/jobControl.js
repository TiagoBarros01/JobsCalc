const views = require('../basePath');
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
          budget: Profile.data.valueHour * job.totalHours,
        };
      });

      return res.render(`${views}index`, { profile: Profile.data, jobs: updatedJobs });
    },
    create(req, res) {
      return res.render(`${views}job`);
    },
    save(req, res) {
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
  },
};

module.exports = { jobControl };
