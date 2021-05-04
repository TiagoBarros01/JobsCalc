const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => res.sendFile(`${__dirname}/views/index.html`));

module.exports = routes;
