const router = require('express').Router();
const session = require('express-session');
const { Student, Faculty, Admin } = require('../Models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "this is Shrey's secret for JWT authentication!";

router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

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

router.get("/addstudent", function (req, res) {
    res.render("admin/addstudent");
});
router.get("/successregister", function (req, res) {
    res.render("successregister");
});
router.post("/registerStudent", function (req, res) {
    res.redirect("/users/successregister");
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


router.post("/loginjwt", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    Faculty.findOne({ username: username }).exec(function (err, faculty) {
        if (err) {
            console.error(err);
        } else {
            const data = {
                facultyId: faculty._id,
                user: faculty.username
            };
            const token = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
            res.json({ token });

        }
    });


});


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, jwtSecret, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalid or expired' });
        }
        req.user = data;
        next();
    });
}

router.get("/check", verifyToken, function (req, res) {
    const { facultyId, user } = req.user;
    res.json(req.user);
});
module.exports = { router, verify };