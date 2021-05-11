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

    // Initial value for each job in progress
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? 'done' : 'progress';

      // adds the amount of status
      statusCount[status] += 1;

      // total hours per day of each job in progress
      jobTotalHours = status === 'progress' ? jobTotalHours + Number(job.dailyHours) : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile.valueHour),
      };
    });

    // amount of hours i want to work
    // less
    // amount of hours/day for each job in (progress)
    const freeHours = profile.hoursPerDay - jobTotalHours;

    return res.render('index',
      {
        jobs: updatedJobs,
        profile,
        statusCount,
        freeHours,
      });
  },
};
