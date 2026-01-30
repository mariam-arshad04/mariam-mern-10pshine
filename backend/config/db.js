const mysql = require("mysql2/promise");
const logger = require("./logger");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    // Test connection
    const [rows] = await pool.query("SELECT 1");
    logger.info("✅ MySQL connected successfully");
  } catch (err) {
    logger.error("❌ MySQL connection failed", err);
    process.exit(1); // exit server if DB fails
  }
})();

module.exports = pool;
