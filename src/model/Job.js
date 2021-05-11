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
  async create(newJob) {
    const db = await Database();

    await db.run(`INSERT INTO jobs (
      name,
      dailyHours,
      totalHours,
      createdAt
    ) VALUES (
      "${newJob.name}",
      ${newJob.dailyHours},
      ${newJob.totalHours},
      ${newJob.createdAt}
    )`);

    await db.close();
  },
  update(updateJob) {
    data = updateJob;
  },
  async delete(jobId) {
    const db = await Database();

    await db.run(`DELETE FROM jobs WHERE id = ${jobId}`);

    await db.close();
    data = data.filter((item) => Number(item.id) !== Number(jobId));
  },
};
