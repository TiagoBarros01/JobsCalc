const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

// using req body
app.use(express.urlencoded({ extended: true }));

// using template engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// static file paths
app.use(express.static('public'));

// routes
app.use(routes);

// create server
app.listen(3000, () => console.log('server is running 🔥'));
