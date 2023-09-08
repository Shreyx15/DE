const { Student, Image } = require('../Models/db');
const router = require('express').Router();
const { ObjectId } = require("mongodb");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'drq6qjbpg',
    api_key: '974438935726475',
    api_secret: 'FUhM3MyKCmElu0uEeL-wFqWRjlM',
    secure: true
});


router.post("/add_student", async function (req, res) {
    const {
        enrollment_number,
        name,
        email,
        address,
        username,
        password,
        course,
        semester,
        subjects
    } = req.body;

    const newStudent = new Student({
        enrollment_number,
        name,
        email,
        address,
        username,
        password,
        course,
        semester,
        subjects
    });

    const savedStudent = await newStudent.save();
    res.json(savedStudent);
});


router.post("/update_student/:student_id", async function (req, res) {
    const id = ObjectId(req.params.student_id);
    const data = req.body;
    const updateObject = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            updateObject[key] = data[key]
        }
    }
    const updatedStudent = await Student.updateOne({ _id: id }, {
        $set: updateObject
    });
    const s = await Student.findById(id);
    res.json(s);
});

router.post("/delete_student/:student_id", async function (req, res) {
    const id = ObjectId(req.params.student_id);

    const deletedStudent = await Student.findOneAndDelete({ _id: id });
    res.json(deletedStudent);
});


router.post("/upload", async function (req, res) {
    const data = req.body;
    console.log(data.imageUrl);
    const newImg = new Image({
        image: data.imageUrl
    });

    newImg.save();
    res.send("image stored!");
});


router.get("/upload", function (req, res) {
    res.render("admin/upload");
});
module.exports = router;