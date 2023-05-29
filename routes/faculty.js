const router = require('express').Router();
const { verify } = require('./auth');
const { Attendance, Student, AttendanceTrack } = require('../Models/db');
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


            // Define an async function to handle the attendance update
            async function updateAttendance(enrollmentNumber, subject) {
                try {
                    // Find the document with the matching enrollment number
                    const doc = await AttendanceTrack.findOne({ enrollment_number: enrollmentNumber });

                    if (!doc) {
                        console.log('Document not found');
                        // Handle the case when the document is not found
                        return;
                    }

                    // Find the subject_attendance object for the specific subject
                    const subjectAttendance = doc.subject_attendance.find(
                        (attendance) => attendance.subject === subject

                    );
                    // console.log(subjectAttendance);
                    if (subjectAttendance) {
                        // Increment the total_lectures_attended for the specific subject
                        subjectAttendance.total_lectures_attended += 1;
                    }

                    // Save the updated document
                    const updatedDoc = await doc.save();

                    // Document updated successfully
                    console.log('Attendance updated successfully');
                    console.log(updatedDoc);
                    // Perform any additional actions
                } catch (err) {
                    console.error(err);
                    // Handle the error
                }
            }

            // Call the function with the appropriate enrollment number and subject values
            updateAttendance(a, subject);



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

router.get("/dummy", function (req, res) {
    // Assuming you have a model named "Attendance" defined for the "attendance_track" schema

    const dummyData = [
        {
            enrollment_number: 200160107039,
            subject_attendance: [
                {
                    subject: 'AJP',
                    total_lectures_attended: 0
                },
                {
                    subject: 'TOC',
                    total_lectures_attended: 0
                }
            ]
        },
        {
            enrollment_number: 200160107044,
            subject_attendance: [
                {
                    subject: 'AJP',
                    total_lectures_attended: 12
                },
                {
                    subject: 'TOC',
                    total_lectures_attended: 6
                }
            ]
        }
    ];

    // Insert the dummy data
    AttendanceTrack.insertMany(dummyData, (err, docs) => {
        if (err) {
            console.error(err);
            // Handle the error
        } else {
            console.log('Dummy data inserted successfully');
            console.log(docs);
            // Perform any additional actions
        }
    });

});

module.exports = router;