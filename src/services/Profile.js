const views = require('../basePath');

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
      return res.render(`${views}profile`, { profile: Profile.data });
    },
  },
};

module.exports = Profile;
