const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');

const connect = () => mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/attendance-system');

yargs(hideBin(process.argv))
  .command(
    'percentage',
    'Show subject-wise attendance percentage of a student',
    (y) =>
      y
        .option('roll', { alias: 'r', type: 'string', demandOption: true, describe: 'Student roll number' })
        .option('subject', { alias: 's', type: 'string', describe: 'Filter by one subject' }),
    async (argv) => {
      await connect();

      const student = await Student.findOne({ rollNo: argv.roll });
      if (!student) {
        console.log(`Student ${argv.roll} not found`);
        return mongoose.disconnect();
      }

      const filter = { rollNumber: argv.roll };
      if (argv.subject) filter.subject = argv.subject;
      const records = await Attendance.find(filter);

      const map = {};
      records.forEach((r) => {
        if (!map[r.subject]) map[r.subject] = { present: 0, total: 0 };
        map[r.subject].total++;
        if (r.status === 'Present') map[r.subject].present++;
      });

      const rows = Object.keys(map).map((sub) => ({
        Subject: sub,
        Present: map[sub].present,
        Total: map[sub].total,
        Percentage: ((map[sub].present / map[sub].total) * 100).toFixed(1) + '%',
      }));

      console.log(`\n${student.name} (${student.rollNo}) | ${student.course} | Sem ${student.semester}`);
      if (rows.length === 0) console.log('No attendance records yet');
      else console.table(rows);

      await mongoose.disconnect();
    }
  )

  // node cli.js students --course "B.Voc. Software Development" --semester 5
  .command(
    'students',
    'List students (optionally filter by course / semester)',
    (y) =>
      y
        .option('course', { alias: 'c', type: 'string', describe: 'Course name' })
        .option('semester', { type: 'number', describe: 'Semester number' }),
    async (argv) => {
      await connect();

      const filter = {};
      if (argv.course) filter.course = argv.course;
      if (argv.semester) filter.semester = argv.semester;

      const students = await Student.find(filter);
      console.table(
        students.map((s) => ({ Roll: s.rollNo, Name: s.name, Course: s.course, Sem: s.semester, Batch: s.batch }))
      );
      console.log(`${students.length} student(s)`);

      await mongoose.disconnect();
    }
  )

  // node cli.js logs --lines 10
  .command(
    'logs',
    'Show last lines of the attendance log file',
    (y) => y.option('lines', { alias: 'n', type: 'number', default: 10, describe: 'Number of lines' }),
    (argv) => {
      const file = path.join(__dirname, 'logs', 'attendance.log');
      if (!fs.existsSync(file)) return console.log('No log file yet');
      const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
      console.log(lines.slice(-argv.lines).join('\n'));
    }
  )

  .demandCommand(1, 'Please give a command: percentage, students or logs')
  .strict()
  .help()
  .parse();