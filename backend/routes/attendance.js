const express = require('express');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

const router = express.Router();

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const { student, date, status } = req.body;
    const record = await Attendance.create({ student, date, status });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View all attendance records
router.get('/', async (req, res) => {
  const records = await Attendance.find().populate('student');
  res.json(records);
});

// Attendance percentage of every student
router.get('/percentage', async (req, res) => {
  const students = await Student.find();
  const result = [];

  for (const s of students) {
    const total = await Attendance.countDocuments({ student: s._id });
    const present = await Attendance.countDocuments({ student: s._id, status: 'Present' });
    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);
    result.push({ name: s.name, rollNo: s.rollNo, total, present, percentage });
  }

  res.json(result);
});

module.exports = router;