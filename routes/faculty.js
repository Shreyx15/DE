const router = require('express').Router();
const Student = require("../Models/db");
const { verify } = require('./auth');



router.get("/facultyHome", verify, function (req, res) {
    res.render("faculty/facultyHome");
});

router.get("/selectClass", function (req, res) {
    res.render("select_class");
});

router.get("/mark-attendance", function (req, res) {
    res.render("mark");
});

router.get("/download_attendance", verify, function () {

});
module.exports = router;