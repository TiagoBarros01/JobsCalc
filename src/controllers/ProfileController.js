const Profile = require('../model/Profile');

// Profile controllers
module.exports = {
  index(req, res) {
    return res.render('profile', { profile: Profile.get() });
  },

  update(req, res) {
    const data = req.body;

    const weekPerYear = 52;
    const weeksPerMonth = (weekPerYear - data.vacationPerYear) / 12;
    const totalWeekHours = data.hoursPerDay * data.daysPerWeek;
    const totalMonthlyHours = totalWeekHours * weeksPerMonth;

    const valueHour = data.monthlyBudget / totalMonthlyHours;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      valueHour,
    });

    return res.redirect('/profile');
  },
};
