const express = require("express");

const studentsRouter = require("./routes/student.route");

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
