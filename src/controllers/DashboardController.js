const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

const profile = Profile.get();
const jobs = Job.get();

module.exports = {
  index(req, res) {
    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile.valueHour),
      };
    });

    return res.render('index', { jobs: updatedJobs, profile, statusCount });
  },
};
