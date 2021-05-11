const Database = require('../db/config');

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get('SELECT * FROM profile ');

    db.close();

    return data;
  },
  update(newData) {
    data = newData;
  },
};
