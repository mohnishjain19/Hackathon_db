
const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('find-config')('.env') }) 
 
const username = process.env.nodemailer_username;

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: username,
        pass: process.env.nodemailer_password
    }
});
 
let mailDetails = {
    from: username,
    to: 'aniruddh.iitb.92@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(`Error : ${err}`);
    } else {
        console.log('Email sent successfully' , data);
    }
});