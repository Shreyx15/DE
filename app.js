const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { stringify } = require('nodemon/lib/utils');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect('mongodb://127.0.0.1:27017/DE'); // connect to mongoDB localhost

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
const authRoutes = require("./routes/auth");

app.use('/users/admin', adminRoutes);
app.use('/users/faculty', facultyRoutes);
app.use('/users', authRoutes);

app.listen(3000, function () {
    console.log("port is active now!");
});
