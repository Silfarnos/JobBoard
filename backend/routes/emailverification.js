const express = require('express')
const router = express.Router()
const mail = require('../controllers/mail')

router.post('/mailconfirm/:token', mail.emailVerified);
router.post('/resetpassword/:token', mail.resetPassword);
router.post('/sendverificationemail', mail.sendConfirmationEmail);
router.post('/sendresetpasswordemail', mail.SendresetPasswordMail);

module.exports = router