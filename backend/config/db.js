const mysql = require("mysql2/promise");
const logger = require("./logger");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    await pool.query("SELECT 1");
    logger.info("✅ MySQL connected");
  } catch (err) {
    logger.error(err, "❌ MySQL connection failed");
  }
})();

module.exports = pool;
