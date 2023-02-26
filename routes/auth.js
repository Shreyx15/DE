const router = require('express').Router();
const { Student, Faculty, Admin } = require('../Models/users');
const bcrypt = require('bcrypt');

router.get("/login", function (req, res) {

    res.render("login");
});

router.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    if (role == "Student") {
        Student.find({ enroll_no: username }, function (err, docs) {
            if (err) {
                console.log(err);
                return;
            }

            console.log(docs[0].password);
            let userps = docs[0].password;

            bcrypt.compare(password, userps).then(function (match) {
                if (match) {
                    res.redirect("/users/faculty/facultyHome");
                } else {
                    res.send("lol");
                }
            });
        });


    }

    if (role == "Faculty") {
        console.log("do something!!");
    }

    if (role == "Administrator") {
        console.log("do something!!");
    }
});


router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    bcrypt.hash(req.body.password, 10).then(function (hash) {
        Student.updateOne({ enroll_no: req.body.username }, { $set: { password: hash } }, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                console.log("document updated!!");
            }
        });
        const student = Student.find({ enroll_no: req.body.username });
        res.send("done");
    });


});


module.exports = router;