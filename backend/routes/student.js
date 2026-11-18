const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Add student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.course) filter.course = req.query.course;
  if (req.query.semester) filter.semester = Number(req.query.semester);
  if (req.query.batch) filter.batch = Number(req.query.batch);

  const students = await Student.find(filter).sort({ rollNo: 1 });
  res.json(students);
});

module.exports = router;