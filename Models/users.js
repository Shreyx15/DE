const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        maxLength: 20
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 20
    },
    father_name: {
        type: String,
        required: true,
        maxLength: 20
    },
    full_name: String,
    dob: {
        type: Date,
        required: true
    },
    gender: String,
    semester: Number,
    course: {
        type: String,
        required: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        maxLength: 20
    },
    username: String,
    password: String,
    enroll_no: Number
});

const facultySchema = new mongoose.Schema({
    username: String,
    password: String
});


const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});


const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Student, Faculty, Admin
};