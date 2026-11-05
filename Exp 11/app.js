const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log("Database Connection Error:", error));

// Student Schema Definition
const studentSchema = new mongoose.Schema({
  regNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String },
  cgpa: { type: Number }
});

// Student Mongoose Model
const Student = mongoose.model("Student", studentSchema);

// Home Route
app.get("/api", (req, res) => {
  res.send("NodeJS MongoDB Application is Running");
});

// 1. CREATE Operation: Insert a Student Record
app.post("/students", async (req, res) => {
  try {
    const student = new Student({
      regNo: req.body.regNo,
      name: req.body.name,
      department: req.body.department,
      email: req.body.email,
      cgpa: req.body.cgpa
    });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. READ Operation: Display All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. READ Operation: Read One Student Using Register Number
app.get("/students/:regNo", async (req, res) => {
  try {
    const student = await Student.findOne({
      regNo: req.params.regNo
    });
    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. UPDATE Operation: Modify Student Details
app.put("/students/:regNo", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { regNo: req.params.regNo },
      {
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        cgpa: req.body.cgpa
      },
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. DELETE Operation: Remove a Student
app.delete("/students/:regNo", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({
      regNo: req.params.regNo
    });
    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }
    res.json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server Listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
