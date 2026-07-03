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

const getStudents = (req, res) => {
  res.json({
    message: "GET request to /students/check successful",
    students: students,
  });
};

const getStudentById = (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      message: `Student with id ${studentId} not found`,
    });
  }
  res.json({
    message: `GET request to /students/${studentId} successful`,
    student: student,
  });
};

const addStudent = (req, res) => {
  const { name, branch } = req.body || {};
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

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
};
