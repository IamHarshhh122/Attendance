const test = require('node:test');
const assert = require('node:assert');
const Attendance = require('../models/Attendance');

const valid = {
  rollNumber: '24107021',
  semester: 5,
  subject: 'Full Stack Web Development',
  date: '2026-11-18',
  status: 'Present',
};

test('attendance record needs rollNumber, semester, subject, date and status', () => {
  const err = new Attendance({}).validateSync();
  assert.ok(err.errors.rollNumber);
  assert.ok(err.errors.semester);
  assert.ok(err.errors.subject);
  assert.ok(err.errors.date);
  assert.ok(err.errors.status);
});

test('attendance status must be Present or Absent', () => {
  const err = new Attendance({ ...valid, status: 'Late' }).validateSync();
  assert.ok(err.errors.status);
});

test('a valid attendance record passes validation', () => {
  const err = new Attendance(valid).validateSync();
  assert.strictEqual(err, undefined);
});