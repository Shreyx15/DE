const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    enrollment_number: {
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


const lectures_track = new mongoose.Schema({
    subject: {
        type: String
    },
    total_lectures_attended: {
        type: Number,
        required: true,
        default: 0
    },
    percentage: {
        type: Number,
        required: true
    }
});


const attendance_track = new mongoose.Schema({
    enrollment_number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subject_attendance: [lectures_track]
});

attendance_track.pre('save', function (next) {
    const subjectAttendances = this.subject_attendance;
    for (let i = 0; i < subjectAttendances.length; i++) {
        const subjectAttendance = subjectAttendances[i];
        subjectAttendance.percentage = (subjectAttendance.total_lectures_attended / 20) * 100;
    }
    next();
});


const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Admin = mongoose.model('Admin', adminSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const AttendanceTrack = mongoose.model('AttendanceTrack', attendance_track);

module.exports = {
    Student, Faculty, Admin, Attendance, AttendanceTrack
};