const router = require('express').Router();
const Student = require("../Models/users");



router.get("/facultyHome", function (req, res) {
    res.render("facultyHome");
});

router.get("/selectClass", function (req, res) {
    res.render("select_class");
});

router.get("/mark-attendance", function (req, res) {
    res.render("mark");
});

module.exports = router;