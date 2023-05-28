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
            refreshToken: "1//04SVIZuaaW0bJCgYIARAAGAQSNgF-L9Irw-6G-Upx70BL7yM_BUC9HeGxHIViBfoDIKCZ_29cDgSyIbrvxqaABkTGH2OBn9uaug",
            accessToken: "ya29.a0AWY7CkmFp5Oq04khBVwrkZ7lUPl9iJ2SSYdCV5yZATEcsJVvrfI-Vw3Dfy3eEUewwwODpKRcvmt7nu4Tt-L8lRATUsl1s6kTxhjGo93skRW54Q7qb6d4vbHToiVygO2gT9eBBNktbtw2VKsWLskPJ253KgMUaCgYKAXkSARMSFQG1tDrp7Hhxb96I499Rh0tZ3cCtuw0163",
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