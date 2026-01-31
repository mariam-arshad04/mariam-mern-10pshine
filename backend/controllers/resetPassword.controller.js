const db = require("../config/db");
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    const [users] = await db.query(
      `SELECT reset_otp, reset_otp_expiry 
       FROM users WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    if (user.reset_otp !== otp || new Date(user.reset_otp_expiry) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.query(
      `UPDATE users 
       SET password=?, reset_otp=NULL, reset_otp_expiry=NULL 
       WHERE email=?`,
      [hashedPassword, email]
    );

    logger.info({ email }, "Password reset successful");

    res.json({ message: "Password reset successful" });
  } catch (error) {
    logger.error(error, "Reset password failed");
    next(error);
  }
};
