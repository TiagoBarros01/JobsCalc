const Profile = require('../model/Profile');

// Profile controllers
module.exports = {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.get() });
  },

  async update(req, res) {
    const data = req.body;

    const weekPerYear = 52;
    const weeksPerMonth = (weekPerYear - data.vacationPerYear) / 12;
    const totalWeekHours = data.hoursPerDay * data.daysPerWeek;
    const totalMonthlyHours = totalWeekHours * weeksPerMonth;

    const valueHour = data.monthlyBudget / totalMonthlyHours;

    const profile = await Profile.get();

    await Profile.update({
      ...profile,
      ...req.body,
      valueHour,
    });

    return res.redirect('/profile');
  },
};
