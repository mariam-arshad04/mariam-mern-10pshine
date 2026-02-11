const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const logger = require("../config/logger");


exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error("All fields are required");
      err.status = 400;
      throw err;
    }

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      const err = new Error("User already exists");
      err.status = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

// login
exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        const err = new Error("Email and password are required");
        err.status = 400;
        throw err;
      }
  
      const [users] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
  
      if (users.length === 0) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
      }
  
      const user = users[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      logger.info(`User logged in: ${email}`);
  
      res.json({
        success: true,
        token,
        email: user.email,
        name: user.name,
      });
    } catch (err) {
      next(err);
    }
  };