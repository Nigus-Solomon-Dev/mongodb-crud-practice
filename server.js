const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student created", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});