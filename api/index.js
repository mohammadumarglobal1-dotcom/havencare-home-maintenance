const express = require('express');
const apiRoutes = require('../server/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api', apiRoutes);

module.exports = app;
