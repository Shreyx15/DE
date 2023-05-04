const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    enrollmentNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    }
});


const facultySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    }
});


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const attendanceSchema = new mongoose.Schema({
    enrollment_number: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    class_number: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Admin = mongoose.model('Admin', adminSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = {
    Student, Faculty, Admin, Attendance
};