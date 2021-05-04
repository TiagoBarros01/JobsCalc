const express = require('express');

const routes = require('./routes');

const app = express();

// using template engine
app.set('view engine', 'ejs');

// static file paths
app.use(express.static('public'));

// routes
app.use(routes);

// create server
app.listen(3000, () => console.log('server is running 🔥'));
