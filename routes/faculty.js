const router = require('express').Router();
const { verify } = require('./auth');
const { Attendance, Student } = require('../Models/db');
const exceljs = require('exceljs');
const nodemailer = require('nodemailer');
const { sendMail } = require('./sendMail');



router.get("/facultyHome", verify, function (req, res) {
    res.render("faculty/facultyHome");
});

router.get("/selectClass", function (req, res) {
    res.render("faculty/select_class");
});

router.get("/mark-attendance", verify, function (req, res) {
    const subject = req.query.subject;

    Student.find({ subjects: { $in: [subject] } })
        .then((s) => {
            const context = {
                "subject": subject,
                "students": s
            };
            res.render("faculty/mark", context);

        })
        .catch((err) => {
            console.error(err);
        });


});

router.post("/mark-attendance", verify, function (req, res) {
    const attendance = req.body.data;
    const subject = req.body.subject;

    if (attendance) {
        attendance.forEach((a) => {
            const attendance = new Attendance({
                enrollment_number: a,
                subject: subject,
                class_number: 1

            });

            attendance.save()
                .then(() => {
                    console.log("done");
                })
                .catch((err) => {
                    console.log(err);
                });
        });


    } else {
        res.send("error");
    }

    res.redirect("/users/faculty/facultyHome");

});

router.get("/download_attendance", verify, function (req, res) {

    const username = req.session.user;


    // console.log(user);
    createAttendanceExcelFile(req, res);

});
async function createAttendanceExcelFile(req, res) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    // Fetch attendance data from the database


    const attendanceData = await Attendance.find({});

    // Set up headers for the Excel file
    worksheet.columns = [
        { header: 'Enrollment Number', key: 'enrollment_number', width: 20 },
        { header: 'Subject', key: 'subject', width: 20 },
        { header: 'Class Number', key: 'class_number', width: 20 },
        { header: 'Created At', key: 'created_at', width: 30 },
    ];

    // Add attendance data to the worksheet
    attendanceData.forEach((attendance) => {
        worksheet.addRow({
            enrollment_number: attendance.enrollment_number,
            subject: attendance.subject,
            class_number: attendance.class_number,
            created_at: attendance.created_at,
        });
    });

    // Set up the response headers for the Excel file
    const fileName = 'attendance.xlsx';
    const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Write the Excel file to the response
    const buffer = await workbook.xlsx.writeBuffer();
    res.send(buffer);
}

router.get("/view_attendance", verify, function (req, res) {
    const date = req.query.date;

    if (date) {
        Attendance.find({ created_at: { $gte: new Date(date), $lt: new Date(date + 'T23:59:59.999Z') } })
            .then((attendanceData) => {
                res.render("faculty/view_attendance", {
                    'attendance': attendanceData
                });
            })
            .catch((error) => {
                console.error("Error fetching attendance data:", error);
                res.status(500).send("Failed to fetch attendance data");
            });
    } else {
        const attendance = [];
        res.render("faculty/view_attendance", { 'attendance': attendance });
    }

});


router.post("/sendMail", verify, function (req, res) {
    const enrollmentNumbers = req.body.data;

    const emails = [];

    const fetchEmails = async () => {
        try {
            const students = await Student.find({ enrollment_number: { $in: enrollmentNumbers } });

            students.forEach((student) => {
                emails.push(student.email);
            });

            console.log(emails);
            for (const email of emails) {
                sendMail(email);
            }
        } catch (error) {
            console.error('Error retrieving student emails:', error);
        }
    };

    fetchEmails();

    res.send("done");



});

module.exports = router;