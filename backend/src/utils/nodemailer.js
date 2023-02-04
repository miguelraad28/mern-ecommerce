const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'miguelraad2020@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter