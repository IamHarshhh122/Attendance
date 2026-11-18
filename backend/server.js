const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance'); 

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/attendance-system')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err.message));

app.get('/', (req, res) => {
  res.send('Attendance API running');
});

// 1. Get Students by Course and Semester
app.get('/api/students', async (req, res) => {
    try {
        const { course, semester } = req.query;
        let query = {};
        if (course) query.course = course;
        if (semester) query.semester = Number(semester);
        
        const students = await Student.find(query);
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get Semester-wise & Subject-wise Attendance for a Student
app.get('/api/attendance/:rollNumber', async (req, res) => {
    try {
        const { rollNumber } = req.params;
        const student = await Student.findOne({ rollNo: rollNumber });
        if (!student) return res.status(404).json({ error: "Student not found" });

        const records = await Attendance.find({ rollNumber });

        const subjectMap = {};
        records.forEach(record => {
            if (!subjectMap[record.subject]) {
                subjectMap[record.subject] = { total: 0, present: 0 };
            }
            subjectMap[record.subject].total += 1;
            if (record.status === 'Present') {
                subjectMap[record.subject].present += 1;
            }
        });

        const subjectSummary = Object.keys(subjectMap).map(subject => {
            const sub = subjectMap[subject];
            const percentage = sub.total > 0 ? ((sub.present / sub.total) * 100).toFixed(2) : 0;
            return {
                subject,
                totalClasses: sub.total,
                presentClasses: sub.present,
                percentage: `${percentage}%`
            };
        });

        res.json({
            name: student.name,
            rollNumber: student.rollNo,
            course: student.course,
            semester: student.semester,
            batch: student.batch,
            slot: student.slot,
            subjectSummary
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Bulk Attendance Mark Route
app.post('/api/attendance/bulk', async (req, res) => {
    try {
        const { records } = req.body;
        if (!records || !Array.isArray(records)) {
            return res.status(400).json({ error: "Invalid records format" });
        }
        
        await Attendance.insertMany(records);
        res.status(201).json({ message: "Bulk attendance recorded successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});