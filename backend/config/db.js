const mysql = require('mysql2');
require('dotenv').config();
const logger = require('./logger');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    logger.error('MySQL connection failed', err);
  } else {
    logger.info('MySQL connected successfully');
    connection.release();
  }
});

module.exports = pool.promise();
