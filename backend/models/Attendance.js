const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true },
    semester: { type: Number, required: true }, 
    subject: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['Present', 'Absent'], required: true }
});

module.exports = mongoose.model('Attendance', attendanceSchema);