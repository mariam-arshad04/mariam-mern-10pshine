const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const { forgotPassword } = require("../controllers/forgotPassword.controller"); // ✅ import here
const { resetPassword } = require("../controllers/resetPassword.controller"); // ✅ import here

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
