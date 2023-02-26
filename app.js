const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { stringify } = require('nodemon/lib/utils');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/DE'); // connect to mongoDB localhost

app.use(express.json());

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
