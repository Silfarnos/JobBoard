const Comment = require('../models/comment');
const Offer = require('../models/offer');
const User = require('../models/user');
const nodemailer = require('nodemailer');
require('dotenv').config();
const password = process.env.password
const mail = process.env.mail

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mail,
    pass: password
  },
  port: 587,
  host: 'smtp.gmail.com',
});



exports.functiongetAllComments = async function (req, res, next) {
  try {
    let count = req.params.skip;

    let comments = await Comment.find().sort({ updateTime: -1 }).skip(count).limit(10);

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Get-One-Comment//////////////////////////////////////////////////////////////////////////

exports.functionGetOneComment = async function (req, res, next) {
  try {
    let comment = await Comment.findOne({ _id: req.params.idComment });
    res.status(200).json(comment);

  } catch (error) {
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Create-Comment////////////////////////////////////////////////////////////////////////////

exports.functionCreateComment = async function (req, res, next) {
  try {

    let offer = await Offer.findOne({ _id: req.params.id });

    let user = null;

    if (req.body.creatorId) {

      user = await User.findOne({ _id: req.body.creatorId });
      user.reponseId.forEach((reponseId) => {
        if (offer.commentId.includes(reponseId)) {
          throw error
        }
      }
      )
    }

    const randomNumber = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    let comment = new Comment({
      ...req.body,
      createTime: Date.now(),
      updateTime: Date.now(),
      offerId: req.params.id,
      randomNumber: randomNumber,
    });



    if (!req.body.creatorId) {
      comment.creatorId = 0;
    }

    if (req.files?.CV_PDF) {
      comment = await checkImage(req, comment);
    }

    if (!req.files?.CV_PDF && user && user.CV_Buffer) {
      comment.fileBuffer = user.CV_Buffer;
    }

    await comment.save();
    let newComment = await Comment.findOne({ randomNumber: randomNumber });

    offer.commentId.push(newComment._id);
    delete newComment.randomNumber;

    await Comment.updateOne({ randomNumber: randomNumber }, newComment);

    await offer.save();
    if (user != null) {
      user.reponseId.push(newComment._id);
      await user.save();
    }
    await sendapplicationEmail(newComment, offer, res);
    res.status(201).json({ message: 'Application submitted' });

  } catch (error) {
    res.status(500).json({ error });
  }
}

let checkImage = function (req, comment) {
  try {

    if (req.files.CV_PDF.mimetype === 'application/pdf') {
      const fileBuffer = req.files.CV_PDF.data;
      comment.fileBuffer = fileBuffer;
      return comment
    }
    throw error;

  } catch (error) {
    res.status(500).json({ error });
  }
}

let sendapplicationEmail = async function (comment, offer) {
  try {
    sendmail = await transport.sendMail({
      from: mail,
      to: offer.creatorEmail,
      subject: 'New application',
      html: `<h1>Hi ${offer.creatorName},</h1>
      <p>You have a new application for your offer ${offer.title}.</p>
      <p>Connect to your account to see it.</p>
      <p>Best regards,</p>
      <p>Team JobBoard</p>`
    })
  } catch (error) {
    throw error
  }
}






/////////////////////////////////////////////////////////Edit-Comment////////////////////////////////////////////////////////////////////////////

exports.functionEditComment = async function (req, res, next) {
  try {
    let comment = await Comment.findOne({ _id: req.params.idComment });
    let newComment = JSON.parse(JSON.stringify(comment));

    let updatedComment = {
      ...newComment,
      ...req.body,
      updateTime: Date.now(),
    };

    if (req.files?.CV_PDF) {
      updatedComment = await checkImage(req, updatedComment);
    }
    await Comment.updateOne({ _id: req.params.idComment }, updatedComment);

    res.status(201).json({ message: 'Application modified' });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////////Delete-Comment////////////////////////////////////////////////////////////////////////////

exports.functionDeleteComment = async function (req, res, next) {
  console.log('delfunc')
  try {
    let comment = await Comment.findOne({ _id: req.params.idComment });

    let offer = await Offer.findOne({ _id: comment.offerId });

    offer.commentId = offer.commentId.filter((commentId) => commentId != req.params.idComment);

    await offer.save();

    await Comment.deleteOne({ _id: req.params.idComment });

    res.status(200).json({ message: 'Application deleted' });

  } catch (error) {
    res.status(500).json({ error });
  }
}

/////////////////////////////////////////////////////Get-One-User-Comment/////////////////////////////////////////////////////////////////////

exports.functionGetOneUserComments = async function (req, res, next) {
  try {

    let comments = await Comment.find({ creatorId: req.params.id }).sort({ updateTime: -1 });
    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({ error });
  }
}

exports.functionCountComments = async function (req, res, next) {
  try {
    let count = await Comment.count();
    res.status(200).json(count);

  } catch (error) {
    res.status(500).json({ error });
  }
}

exports.functionGetOneOfferComments = async function (req, res, next) {
  try {
    let comments = await Comment.find({ offerId: req.params.id });
    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({ error });
  }
}