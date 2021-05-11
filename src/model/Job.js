const Database = require('../db/config');

let data = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    dailyHours: 2,
    totalHours: 1,
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

module.exports = {
  async get() {
    const db = await Database();

    const jobs = await db.all('SELECT * FROM jobs');

    await db.close();

    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      dailyHours: job.dailyHours,
      totalHours: job.totalHours,
      createdAt: job.createdAt,
    }));
  },
  create(newJob) {
    data.push(newJob);
  },
  update(updateJob) {
    data = updateJob;
  },
  delete(jobId) {
    data = data.filter((item) => Number(item.id) !== Number(jobId));
  },
};
