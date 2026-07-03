const express = require("express");

const studentsRouter = require("./routes/student.route");

require("dotenv").config(); // Load environment variables from .env file

const connectDB=require("./config/db");

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies into JavaScript objects

// Middleware
app.use(express.json());

// Student Routes
app.use("/students", studentsRouter);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Student API Running",
  });
});

connectDB();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
