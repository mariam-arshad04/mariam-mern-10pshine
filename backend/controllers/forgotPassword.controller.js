const db = require("../config/db");
const sendEmail = require("../utils/sendEmail");
const logger = require("../config/logger");

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const [users] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await db.query(
      "UPDATE users SET reset_otp=?, reset_otp_expiry=? WHERE email=?",
      [otp, expiry, email]
    );

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    logger.info({ email }, "Password reset OTP sent");

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    logger.error(error, "Forgot password failed");
    next(error);
  }
};
