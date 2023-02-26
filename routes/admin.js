const router = require('express').Router();
const { Student } = require("../Models/users");



router.get("/dashboard", function (req, res) {
    res.render("dashboard");
});



router.get('/addStudent', function (req, res) {
    range = []
    for (let i = 1990; i <= 2022; i++) {
        range.push(i);
    }
    res.render("addstudent", {
        'years': range
    });
});


router.post('/addstudent', function (req, res) {
    var fname = req.body.first_name;
    var lname = req.body.last_name;
    var dob = {
        day: req.body.day,
        month: req.body.month,
        year: req.body.year
    }
    var fathername = req.body.father_name;
    var date = new Date(String(dob.year) + '-' + String(dob.month) + '-' + String(dob.day));
    var email = req.body.email;
    var course = req.body.course;

    const student = new Student({
        first_name: fname,
        last_name: lname,
        father_name: fathername,
        full_name: lname + fname + fathername,
        dob: date,
        email: email,
        semester: 5,
        course: course

    });

    student.save();
    res.redirect('/users/admin/addstudent');
});


module.exports = router;