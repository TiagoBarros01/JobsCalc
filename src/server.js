/* eslint-disable no-useless-return */
import express from 'express';

const app = express();

app.use('/', (req, res) => {
  console.log('entered');

  return res.send({ message: 'hello backend' });
});

app.listen(3000, () => console.log('server is running 🔥'));
