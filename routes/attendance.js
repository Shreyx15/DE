const router = require('express').Router();
const { Attendance } = require('../Models/db');
const { updateAttendance } = require("./faculty");


router.get("/attendance", function (req, res) {
    res.render("attendance");
});

router.post("/takeAttendance", async function (req, res) {
    const enrollment_number = req.body.enrollment_number;
    const subject = req.body.subject;
    const class_number = req.body.class_number;
    const lon1 = 72.9677824;
    const lat1 = 22.5673216;
    const lat2 = 22.5673216;
    const lon2 = 72.9677824;

    async function isValid() {
        const oneHour = 60 * 60 * 1000; // milliseconds in one hour

        try {
            const attendance = await Attendance.findOne({ enrollment_number: enrollment_number });
            const currentTime = Date.now();
            const createdAt = attendance.created_at.getTime(); // get time in milliseconds  
            const difference = currentTime - createdAt; // difference in milliseconds
            const hours = difference / oneHour; // difference in hours
            console.log(hours);
            return hours >= 1;
        } catch (err) {
            // handle error
            console.log(err);
            return false;
        }
    }

    if (await isValid()) {
        // console.log(distance(lat1, lon1, lat2, lon2));
        if (distance(lat1, lon1, lat2, lon2)) {
            const attendance = new Attendance({
                enrollment_number: enrollment_number,
                subject: subject,
                class_number: class_number

            });

            attendance.save()
                .then(() => {
                    res.send("Attendance marked successfully!");
                })
                .catch((err) => {
                    console.log(err);
                });


            updateAttendance(enrollment_number, subject);

        } else {
            res.send("go to college and dont try this again!");
        }
    } else {
        res.send("wait till the current lecture ends! You can submit the attendance afterwards!");
    }

});



function distance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371e3; // meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance <= 10;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;