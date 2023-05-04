const router = require('express').Router();
const Student = require("../Models/db");
const { verify } = require('./auth');
const { Attendance } = require('../Models/db');
const exceljs = require('exceljs');

router.get("/facultyHome", verify, function (req, res) {
    res.render("faculty/facultyHome");
});

router.get("/selectClass", function (req, res) {
    res.render("select_class");
});

router.get("/mark-attendance", function (req, res) {
    res.render("mark");
});

router.get("/download_attendance", verify, function (req, res) {
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

    createAttendanceExcelFile(req, res);

});


module.exports = router;