const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    father_name: String,
    full_name: String,
    dob: Date,
    email: String,
    gender: String,
    address: String,
    semester: Number,
    state: String,
    city: String,
    course: String,

});


module.exports = mongoose.model('Student', studentSchema);