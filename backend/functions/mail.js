require('dotenv').config();
const nodemailer = require('nodemailer');
const mail = process.env.mail
const password = process.env.password
const token = process.env.token
const jwt = require('jsonwebtoken');

//////////////////Send-Email-Verification///////////////////////////

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mail,
    pass: password
  },
  port: 587,
  host: 'smtp.gmail.com',
});

exports.sendConfirmationMail = async function (req, res, user, next) {

  try {
    tokenEmail = jwt.sign({ email: user.email }, token, { expiresIn: '24h' })
  
    if (user.emailVerified) {
      res.status(400).json({ message: 'Email already verified' });
    }
    sendmail = await transport.sendMail({
      from: mail,
      to: user.email,
      subject: 'Please confirm your Email account',
      html: `<h1>Email confirmation </h1>
                 <h2>Hello ${user.name}</h2>
                 <p> Click on the link to confirm your email</p>
                 <a href="http://localhost:8080/verifyemail/${tokenEmail}">Click here</a>`
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}


exports.sendResetPassword = async function (req, res, user, next) {
  try {

    tokenEmail = jwt.sign({ email: user.email }, token, { expiresIn: '24h' })

    sendmail = await transport.sendMail({
      from: mail,
      to: user.email,
      subject: 'Please confirm your Email account',
      html: `<h1>Email confirmation </h1>
               <h2>Hello ${user.name}</h2>
               <p> Click on the link reset your password</p>
               <a href="http://localhost:8080/resetpassword/${tokenEmail}">Click here</a>`
    })

  } catch (error) {
    res.status(500).json({ error })
  }
}
