const express = require('express');
const router = express.Router();
let nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', function (req, res) {
    const data = req.body;

    // Basic input validation
    const { from, to, subject, message } = data;

    if (!from || !to || !subject || !message) {
        return res.status(400).json({ error: "All fields (from, to, subject, message) are required." });
    }

    // Ensure 'from' and 'to' fields are valid email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from) || !emailRegex.test(to)) {
        return res.status(400).json({ error: "Invalid email format for 'from' or 'to' field." });
    }

    // Create a transporter object using SMTP
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.USER_PASS
        }
    });

    try {
        // Send email with defined transport object
         transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: message, // plain text body
            html: `<h2>${subject}</h2><b>${message}</b> <br>Reply to <i><emp>${from}</emp></i></br>` // html body
        }, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ error: "Failed to send email. Please try again later." });
            } else {
                console.log("Email sent successfully:", info.response);
                res.status(200).json({ message: "Email sent successfully!" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
});

module.exports = router;
