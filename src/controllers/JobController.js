/* eslint-disable no-param-reassign */
const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  create(req, res) {
    return res.render('job');
  },
  async save(req, res) {
    const job = req.body;

    await Job.create({
      name: job.name,
      dailyHours: job.dailyHours,
      totalHours: job.totalHours,
      createdAt: Date.now(),
    });

    return res.redirect('/');
  },
  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const jobId = req.params.id;

    const job = jobs.find((item) => Number(item.id) === Number(jobId));

    if (!job) {
      return res.send({ error: 'Job not found' });
    }

    job.budget = JobUtils.calculateBudget(job, profile.valueHour);

    return res.render('job-edit', { job });
  },
  async update(req, res) {
    const jobs = await Job.get();

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
