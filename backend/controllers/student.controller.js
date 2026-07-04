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

const addStudent = (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) {
    return res.status(400).json({
      message: "Name and branch are required fields",
    });
  }

  const id = students.length + 1;
  const newStudent = { id, name, branch };
  students.push(newStudent);

  return res
    .status(201)
    .json({ message: "Student added successfully", student: newStudent });
};

const updateStudent = (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      message: `Student with id ${studentId} not found`,
    });
  }

  const { name, branch } = req.body;
  if (name !== undefined) {
    student.name = name;
  }
  if (branch !== undefined) {
    student.branch = branch;
  }

  return res.json({
    message: `PUT request to /students/${studentId} successful`,
    student,
  });
};

const deleteStudent = (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      message: `Student with id ${studentId} not found`,
    });
  }

  students.splice(index, 1);
  return res.status(204).send();
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
