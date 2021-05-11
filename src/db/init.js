const Database = require('./config');

const initDb = async () => {
  const db = await Database();

  await db.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthlyBudget INT,
  daysPerWeek INT,
  hoursPerDay INT,
  vacationPerYear INT,
  valueHour INT
)`);

  await db.exec(`CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  dailyHours INT,
  totalHours INT,
  createdAt DATETIME
)`);

  await db.run(`INSERT INTO profile (
  name,
  avatar,
  monthlyBudget,
  daysPerWeek,
  hoursPerDay,
  vacationPerYear,
  valueHour
) VALUES (
  "Tiago",
  "https://www.github.com/tiagobarros01.png",
  3000,
  5,
  5,
  4
)`);

  await db.run(`INSERT INTO jobs (
  name,
  dailyHours,
  totalHours,
  createdAt
) VALUES (
  "Pizzaria Guloso",
  2,
  1,
  1617514376018
)`);

  await db.run(`INSERT INTO jobs (
  name,
  dailyHours,
  totalHours,
  createdAt,
) VALUES (
  "OneTwo Projects",
  3,
  47,
  1617514376018
)`);

  await db.close();
};

initDb();
