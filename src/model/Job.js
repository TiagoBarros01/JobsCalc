let data = [
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
];

module.exports = {
  get() {
    return data;
  },
  update(updateJob) {
    data = updateJob;
  },
  delete(jobId) {
    data = data.filter((item) => Number(item.id) !== Number(jobId));
  },
};
