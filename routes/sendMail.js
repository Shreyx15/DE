const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();



const sendMail = function main(email) {
    // create transport
    console.log(process.env.MAIL_USERNAME);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: "1//043oYGBFyIFnFCgYIARAAGAQSNgF-L9Iri2m4YDL7yWpyCuUmPOqsJaL5Pn1qtbBm2O7KUa1tsTf3qdVx9YZMqe7MsS_Oqsyefg",
            accessToken: "ya29.a0AWY7Cknt-JG-kwU1iRHxo-hclNpK13-dYtpojVS6fRhki75tOZBvfeIeSoyZ8Cu7q0iJFtaeF7NElFdWRVof7jlxU6tPlWUk2RMhB-tUx9eiyhwFdKPHd2tjfHsM9Lv1Z5Br8sSK8M61NSIjmDqqYuHa91snaCgYKAdYSARMSFQG1tDrpdp6Eo7gO_cK1xYcxUkAZyQ0163",
        }
    });

    // send mail
    const mailOptions = {
        from: 'shreyv15@gmail.com',
        to: email,
        subject: 'Attendance',
        text: 'go to college and attend some lectures!'
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(info.status);
    });
};



module.exports.sendMail = sendMail;