const Profile = {
  data: {
    name: 'Tiago',
    avatar: 'https://www.github.com/tiagobarros01.png',
    monthlyBudget: 3000,
    daysPerWeek: 5,
    hoursPerDay: 6,
    vacationPerYear: 5,
    valueHour: 75,
  },

  controllers: {
    index(req, res) {
      return res.render('profile', { profile: Profile.data });
    },

    update(req, res) {
      const data = req.body;

      const weekPerYear = 52;
      const weeksPerMonth = (weekPerYear - data.vacationPerYear) / 12;
      const totalWeekHours = data.hoursPerDay * data.daysPerWeek;
      const totalMonthlyHours = totalWeekHours * weeksPerMonth;

      const valueHour = data.monthlyBudget / totalMonthlyHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        valueHour,
      };

      return res.redirect('/profile');
    },
  },
};

module.exports = Profile;
