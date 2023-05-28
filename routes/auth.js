const router = require('express').Router();
const session = require('express-session');
const { Student, Faculty, Admin } = require('../Models/db');
const bcrypt = require('bcrypt');

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    if (role === "Faculty") {
        Faculty.findOne({ username: username }).exec(function (err, faculty) {
            if (err) {
                console.error(err);
            } else {
                bcrypt.compare(password, faculty.password, (err, result) => {
                    if (!result) {
                        res.send("wrong password");
                    } else {
                        req.session.facultyId = faculty._id;
                        req.session.isLoggedin = true;
                        req.session.user = faculty.username;
                        req.session.save();
                        res.cookie('sessionId', req.session.id);
                        res.redirect('/users/faculty/facultyHome');
                    }
                });
            }
        });

    } else if (role === "Student") {
        console.log("do something!!");
    }
});


router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {

    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    bcrypt.hash(password, 10).then(function (hash) {
        if (role === "faculty") {
            const newfaculty = new Faculty({
                username: username,
                password: hash,
            });
            newfaculty.save()
                .then(() => {
                    res.send("registered successfully");
                })
                .catch((err) => {
                    console.log(err);
                });

        } else if (role === "student") {
            Student.updateOne({ username: username }, { password: hash })
                .then(() => {
                    res.send("registered successfully");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            res.write("select the role first");
        }
    });


});


router.get("/logout", verify, function (req, res) {
    res.clearCookie('sessionId');
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect("/users/login");
        }
    });
});

function verify(req, res, next) {
    if (!isEmpty(req.cookies)) {
        next();
    } else {
        res.redirect("/users/login");

    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = { router, verify };