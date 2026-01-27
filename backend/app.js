const express = require('express');
require('dotenv').config();
const logger = require('./config/logger');
const errorHandler = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  logger.info('Root route accessed');
  res.send('Backend is running 🚀');
});

// Test error route
app.get('/error', (req, res, next) => {
  const error = new Error('Test error route');
  error.status = 400;
  next(error);
});

// Global error handler (LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
