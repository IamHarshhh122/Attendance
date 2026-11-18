const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'attendance.log');

function logAttendance({ rollNumber, subject, date, status }) {
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const line = `${new Date().toISOString()} | ${rollNumber} | ${subject} | ${date} | ${status}\n`;

  fs.appendFile(logFile, line, (err) => {
    if (err) console.error('Log write failed:', err.message);
  });
}

module.exports = logAttendance;