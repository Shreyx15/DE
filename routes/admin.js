const { Student } = require('../Models/db');
const router = require('express').Router();
const { ObjectId } = require("mongodb");
const fs = require('fs');
const path = require('path');

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


router.post("/uploads/image", async function (req, res) {
    const uploadedFile = await req.files;
    // res.json({ uploadedFile });
    const uploadPath = path.join(__dirname, "uploads", uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.send("File uploaded successfully!");
        }
    });

});

module.exports = router;