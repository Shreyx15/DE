const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { stringify } = require('nodemon/lib/utils');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const dotenv = require('dotenv');
dotenv.config();
express.urlencoded({ extended: true });
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb+srv://Shreyx15:shrey2002@cluster0.8cux0ks.mongodb.net/SAMS_DE?retryWrites=true&w=majority'); // connect to mongoDB localhost

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'this is my secret key for the session!!!', // replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // set cookie expiration time (1 hour)
}));
//imported routes
const adminRoutes = require("./routes/admin");
const facultyRoutes = require("./routes/faculty");
const { router } = require("./routes/auth");
const attendanceRoute = require("./routes/attendance");

app.use('/users/admin', adminRoutes);
app.use('/users/faculty', facultyRoutes.router);
app.use('/users', router);
app.use('', attendanceRoute);

app.listen(3000, function () {
    console.log("port is active now!");
});
