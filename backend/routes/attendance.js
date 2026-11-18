const express = require('express');
const Attendance = require('../models/Attendance');
const logAttendance = require('../utils/logger');

const router = express.Router();

// Mark attendance (one record)
router.post('/', async (req, res) => {
  try {
    const { rollNumber, semester, subject, date, status } = req.body;
    const record = await Attendance.create({ rollNumber, semester, subject, date, status });
    logAttendance({ rollNumber, subject, date, status });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View records (optional filters: ?roll=24107021&subject=...&semester=5)
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.roll) filter.rollNumber = req.query.roll;
  if (req.query.subject) filter.subject = req.query.subject;
  if (req.query.semester) filter.semester = Number(req.query.semester);

  const records = await Attendance.find(filter).sort({ date: -1 });
  res.json(records);
});

// Attendance percentage of one student, subject-wise
router.get('/percentage/:rollNumber', async (req, res) => {
  const records = await Attendance.find({ rollNumber: req.params.rollNumber });

  const stats = {};
  records.forEach((r) => {
    if (!stats[r.subject]) stats[r.subject] = { subject: r.subject, total: 0, present: 0 };
    stats[r.subject].total++;
    if (r.status === 'Present') stats[r.subject].present++;
  });

  const subjects = Object.values(stats).map((s) => ({
    ...s,
    percentage: Math.round((s.present / s.total) * 100),
  }));

  const total = records.length;
  const present = records.filter((r) => r.status === 'Present').length;

  res.json({
    rollNumber: req.params.rollNumber,
    total,
    present,
    percentage: total === 0 ? 0 : Math.round((present / total) * 100),
    subjects,
  });
});

// Update a record (e.g. fix Absent -> Present)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;