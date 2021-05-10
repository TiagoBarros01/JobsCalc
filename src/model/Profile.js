let data = {
  name: 'Tiago',
  avatar: 'https://www.github.com/tiagobarros01.png',
  monthlyBudget: 3000,
  daysPerWeek: 5,
  hoursPerDay: 6,
  vacationPerYear: 5,
  valueHour: 75,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
