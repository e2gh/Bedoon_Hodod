/*jshint esversion:8*/
var nodemailer = require('nodemailer');
var alert = require('alert-node');
var express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

router.get('/', async (req, res) => {
  res.render('contact/index', { title: 'تواصل معنا | بدون حدود'});
});

// POST route from contact form
router.post('/', async (req, res) => {
  // Instantiate the SMTP server
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kianna32@ethereal.email',
        pass: 'DQHPEXSYnVG69v1pXE'
    }
});

  // Specify what the email will look like
  const mailOpts = {
    from: 'Your sender info here', // This is ignored by Gmail
    to: 'kianna32@ethereal.email',
    subject: 'رسالة جديدة من صفحة التواصل',
    text:`${req.body.name} تواصلت معنا عبر صفحة تواصل معنا. معلومات الرسالة كالتالي: \n\n` +
        `الاسم: ${req.body.name} \n` +
        `البريد الإلكتروني: ${req.body.email} \n` +
        `تفاصيل الرسالة: ${req.body.message} \n\n`,
  };

  // Attempt to send the email
transporter.sendMail(mailOpts, (error, response) => {
    if (error) {
      alert('حدث خطأ ما، لم يتم إرسال رسالتك.'); // Show a alert failure
    }
    else {
      alert('شكرًا لتواصلك معنا'); // Show a alert success
        return res.redirect('/contact');
    }

  });
});
module.exports = router;
