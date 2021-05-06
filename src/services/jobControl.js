const views = require('../basePath');

const profile = {
  name: 'Tiago',
  avatar: 'https://www.github.com/tiagobarros01.png',
  monthlyBudget: 3000,
  daysPerWeek: 5,
  hoursPerDay: 6,
  vacationPerYear: 5,
  valueHour: 75,
};

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
          budget: profile.valueHour * job.totalHours,
        };
      });

      return res.render(`${views}index`, { profile, jobs: updatedJobs });
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

module.exports = { profile, jobControl };
