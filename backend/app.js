const express = require("express");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// 🔗 connect auth routes
app.use("/api/auth", authRoutes);

// ❗ always last
app.use(errorHandler);

module.exports = app;
