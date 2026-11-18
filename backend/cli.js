const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, 'attendance.log');

yargs(hideBin(process.argv))
    .command({
        command: 'log',
        describe: 'Log student attendance to a file using File System module',
        builder: {
            roll: {
                describe: 'Student Roll Number',
                demandOption: true,
                type: 'string'
            },
            status: {
                describe: 'Attendance Status (Present/Absent)',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            const timestamp = new Date().toISOString();
            const logEntry = `[${timestamp}] Roll Number: ${argv.roll} | Status: ${argv.status}\n`;

            fs.appendFileSync(logFilePath, logEntry);
            console.log(`[SUCCESS] Attendance logged to file for Roll No: ${argv.roll}`);
        }
    })
    .parse();