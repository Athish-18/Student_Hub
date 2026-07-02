const express = require("express");

const studentsRouter = express.Router();

const studentController = require("../controllers/student.controller");

// GET /students/check
studentsRouter.get("/", studentController.getStudents);

studentsRouter.get('/:id',studentController.getStudentById);

module.exports = studentsRouter;
