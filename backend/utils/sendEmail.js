const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, message }) => {

    // const transport = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASS
    //     }
    // })

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        family: 4
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject,
        html: message
    }

    const result = await transport.sendMail(mailOptions);

    return result;
}

module.exports = sendEmail;