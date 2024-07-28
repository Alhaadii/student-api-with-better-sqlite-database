const express = require("express");
const student = express.Router();
const database = require("../helpers/dbconfig");

database.exec(
  "create table if not exists students (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, gender VARCHAR(20) NOT NULL, phone VARCHAR(50) UNIQUE, parentTell VARCHAR(20) NOT NULL, address VARCHAR(100) NOT NULL,birthDate VARCHAR(10) NOT NULL)"
);

student.get("/", (req, res) => {
  try {
    const data = database.prepare("SELECT * FROM students").all();
    res.send({ Message: "Welcome to Student Management System!", data });
  } catch (error) {
    res.send({ Message: error.message });
  }
});

student.post("/", (req, res) => {
  try {
    const { name, gender, phone, parentTell, address, birthDate } = req.body;
    if (!name || !gender || !phone || !parentTell || !address || !birthDate) {
      throw new Error("All fields are required!");
    } else {
      const checkReg = database
        .prepare("SELECT * FROM students where phone=?")
        .get(phone);

      if (checkReg) {
        throw new Error("Phone number already exists!");
      }

      database
        .prepare(
          "INSERT INTO students (name, gender, phone, parentTell, address, birthDate) VALUES (?,?,?,?,?,?)"
        )
        .run(name, gender, phone, parentTell, address, birthDate);
      res.send("Student added successfully!");
    }
  } catch (error) {
    res.send(error.message);
  }
});
student.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("ID is required!");
    } else {
      const data = database
        .prepare("SELECT * FROM students WHERE id=?")
        .get(id);
      if (!data) {
        throw new Error("Student not found!");
      }
      res.send(data);
    }
  } catch (error) {
    res.send(error.message);
  }
});

student.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("ID is required!");
    } else {
      database.prepare("DELETE FROM students WHERE id=?").run(id);
      res.send("Student deleted successfully!");
    }
  } catch (error) {
    res.send(error.message);
  }
});

student.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, phone, parentTell, address, birthDate } = req.body;
    if (
      !id ||
      !name ||
      !gender ||
      !phone ||
      !parentTell ||
      !address ||
      !birthDate
    ) {
      throw new Error("All fields are required!");
    } else {
      // update
      database
        .prepare(
          "UPDATE students SET name=?, gender=?, phone=?, parentTell=?, address=?, birthDate=? WHERE id=?"
        )
        .run(name, gender, phone, parentTell, address, birthDate, id);
      res.send("Student updated successfully!");
    }
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = student;
