const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const { forgotPassword } = require("../controllers/forgotPassword.controller");
const { resetPassword } = require("../controllers/resetPassword.controller");

const router = express.Router();

// existing auth routes
router.post("/signup", signup);
router.post("/login", login);

// New forgot/reset password routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
