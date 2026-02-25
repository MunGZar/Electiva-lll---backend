const express = require('express');
const cors = require('cors');
const errorHandler = require('./utils/erroHandler');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Define routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/snippets', require('./routes/snippet.routes'));

// Error handler middleware
app.use(errorHandler);

module.exports = app;
