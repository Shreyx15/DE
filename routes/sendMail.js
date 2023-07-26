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
            refreshToken: "1//046_hyqqqgR-pCgYIARAAGAQSNgF-L9Ir9bOe3Z576oLVUXkemxEtRdDW9OopRTOedeqTCuOfoBxMFqFOTXhrna_5-ehSevzXOw",
            accessToken: "ya29.a0AbVbY6MxrOueSABBIQa3OPXpkuJ9_V7NRiBThqX3jObQiyEiwicSwY_NySdLA8Rw57-nOwrQ7Ti08C6GBv9rY1hlLsuSyBbepJRdcN1g_-2KyCHp0Zn6knFm_qHnZT0xXMvqlZhqkZLLtVJyZoz-eAZOo6r6aCgYKAaESARMSFQFWKvPl_RqFaPZexzBXQZKoNb5VGA0163",
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