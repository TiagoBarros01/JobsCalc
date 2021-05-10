/* eslint-disable no-param-reassign */
const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

const jobs = Job.get();
const profile = Profile.get();

module.exports = {
  index(req, res) {
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

    return res.render('index', { profile, jobs: updatedJobs });
  },
  create(req, res) {
    return res.render('job');
  },
  save(req, res) {
    const job = req.body;

    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
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

    const job = jobs.find((item) => Number(item.id) === Number(jobId));

    if (!job) {
      return res.send({ error: 'Job not found' });
    }

    job.budget = JobUtils.calculateBudget(job, profile.valueHour);

    return res.render('job-edit', { job });
  },
  update(req, res) {
    const jobId = req.params.id;

    const job = jobs.find((item) => Number(item.id) === Number(jobId));

    if (!job) {
      return res.send({ error: 'Job not found' });
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      totalHours: req.body.totalHours,
      dailyHours: req.body.dailyHours,
    };

    const updateJobs = jobs.map((item) => {
      if (Number(item.id) === Number(jobId)) {
        item = updatedJob;
      }

      return item;
    });
    Job.update(updateJobs);

    return res.redirect(`/job/${jobId}`);
  },
  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);

    return res.redirect('/');
  },
};
