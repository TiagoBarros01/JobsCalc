module.exports = {
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
};
