const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'miguelraad2020@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter