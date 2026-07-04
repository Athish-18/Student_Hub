const Student = require("../models/student.model");

const students = [
  {
    id: 1,
    name: "Athish",
    branch: "CSE",
  },
  {
    id: 2,
    name: "Rahul",
    branch: "ISE",
  },
];

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      message: "GET request to /students/check successful",
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
};

const getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: `Student with id ${studentId} not found`,
      });
    }

    res.json({
      message: `GET request to /students/${studentId} successful`,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student",
      error: error.message,
    });
  }
};

const addStudent = async (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) {
    return res.status(400).json({
      message: "Name and branch are required fields",
    });
  }

  try {
    const student = await Student.create({ name, branch });

    return res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name, branch } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, branch },
      { new: true },
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: `Student with id ${studentId} not found`,
      });
    }

    return res.json({
      message: `PUT request to /students/${studentId} successful`,
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({
        message: `Student with id ${studentId} not found`,
      });
    }

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
