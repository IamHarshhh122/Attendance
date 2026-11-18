const mongoose = require('mongoose');
const Student = require('./models/Student');

// Wahi exact connection use karo jo server.js mein chal raha hai
mongoose.connect('mongodb://127.0.0.1:27017/attendance-system')
.then(async () => {
    console.log('MongoDB Connected for Seeding...');
    
    const fakeStudents = [
        { name: "Aarav Sharma", rollNo: "24107001", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "9:00 - 10:00 AM" },
        { name: "Priya Verma", rollNo: "24107002", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "9:00 - 10:00 AM" },
        { name: "Rohan Gupta", rollNo: "24107003", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "9:00 - 10:00 AM" },
        { name: "Sneha Singh", rollNo: "24107004", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "9:00 - 10:00 AM" },
        { name: "Amit Kumar", rollNo: "24107005", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "10:00 - 11:00 AM" },
        { name: "Neha Mishra", rollNo: "24107006", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "10:00 - 11:00 AM" },
        { name: "Vikas Yadav", rollNo: "24107007", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "10:00 - 11:00 AM" },
        { name: "Anjali Tiwari", rollNo: "24107008", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "10:00 - 11:00 AM" },
        { name: "Deepak Rawat", rollNo: "24107009", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "11:00 AM - 12:00 PM" },
        { name: "Pooja Pandey", rollNo: "24107010", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "11:00 AM - 12:00 PM" },
        { name: "Manish Chaurasiya", rollNo: "24107011", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "11:00 AM - 12:00 PM" },
        { name: "Kajal Jha", rollNo: "24107012", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "11:00 AM - 12:00 PM" },
        { name: "Sahil Khan", rollNo: "24107013", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "12:00 - 1:00 PM" },
        { name: "Divya Chauhan", rollNo: "24107014", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "12:00 - 1:00 PM" },
        { name: "Rohit Malhotra", rollNo: "24107015", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "12:00 - 1:00 PM" },
        { name: "Simran Kaur", rollNo: "24107016", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "12:00 - 1:00 PM" },
        { name: "Abhishek Thapa", rollNo: "24107017", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "2:00 - 3:00 PM" },
        { name: "Megha Joshi", rollNo: "24107018", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "2:00 - 3:00 PM" },
        { name: "Kunal Roy", rollNo: "24107019", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "2:00 - 3:00 PM" },
        { name: "Shreya Sen", rollNo: "24107020", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "2:00 - 3:00 PM" },
        { name: "Harsh Bhatta", rollNo: "24107021", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "3:00 - 4:00 PM" },
        { name: "Ritu Aggarwal", rollNo: "24107022", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "3:00 - 4:00 PM" },
        { name: "Nikhil Saxena", rollNo: "24107023", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "3:00 - 4:00 PM" },
        { name: "Tanya Kapoor", rollNo: "24107024", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "3:00 - 4:00 PM" },
        { name: "Akash Meena", rollNo: "24107025", course: "B.Voc. Software Development", semester: 5, batch: 2026, slot: "4:00 - 5:00 PM" }
    ];

    try {
        await Student.deleteMany({});
        await Student.insertMany(fakeStudents);
        console.log("Successfully added 25 students into database!");
    } catch (err) {
        console.log("Error inserting:", err);
    } finally {
        mongoose.connection.close();
    }
})
.catch(err => console.log("Connection error:", err));