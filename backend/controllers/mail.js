const User = require('../models/user');
const jwt = require('jsonwebtoken');
const func = require('../functions/mail')
const token = process.env.token

exports.sendConfirmationEmail = async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email })
    await func.sendConfirmationMail(req, res, user, next)
    
    res.status(200).json({ message: 'Mail sent' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.emailVerified = async function (req, res, next) {
  try {
    var email = null
    var user = null

    try {
      let decodedToken = jwt.verify(req.params.token, token);
      email = decodedToken.email;
    } catch (error) {
      throw { error: 'Invalid token', status: 400 }
    }
    try {
      user = await User.findOne({ email: email });
    } catch (error) {
      throw { error: 'User not found', status: 404 }
    }
    try {
      if (user.emailVerified) {
        throw { error: 'Email verified', status: 200 }
      }
    }
    catch (error) {
      throw { error: 'Email verified', status: 200 }
    }

    try{
      await User.updateOne({ email: email }, { emailVerified: true });
    }
    catch (error) {
      throw { error: 'Error during verification', status: 400 }
    }
    res.status(200).json({ message: 'Email verified' })

  } catch (error) {
    res.status(error.status).json({ message: error.error });
  }
}

exports.SendresetPasswordMail = async function (req, res, next) {
  try {
    let user = await User.findOne({ email: req.body.email })
    func.sendResetPassword(req, res, user, next)
    res.status(200).json({ message: 'Mail sent' })

  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.resetPassword = async function (req, res, next) {
  try {

    const decodedToken = jwt.verify(req.params.token, token);
    const email = decodedToken.email

    let user = await User.findOne({ email: email })
    await user.updateOne({ email: email }, { password: req.body.password })

    res.status(200).json({ message: 'Password changed' })

  } catch (error) {
    res.status(500).json({ error })
  }
}

