const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    semester: { type: Number, required: true },
    batch: { type: Number, required: true },
    slot: { type: String, required: false } 
});

module.exports = mongoose.model('Student', studentSchema);