const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.use(errorHandler);

module.exports = app;
