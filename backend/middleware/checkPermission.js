const Offer = require('../models/offer');
const Comment = require('../models/comment');

exports.checkSuperAdmin = (req, res, next) => {
  try{

    if (req.auth.level < 2) {
      
      throw error
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

exports.checkId = (req, res, next) => {
  try {
    if (req.auth.level < 1 && req.auth.userId != req.params.id) {
      throw { status: 401, msg: 'Vous n\'avez pas la permission d\'effectuer cette requête' }
    }
    next();
  } catch (error) {
    res.status(error.status).json({ error: error.msg });
  }
};

exports.checkPermissionsOffer = async (req, res, next) => {
  try {
    let offer = await Offer.findOne({ _id: req.params.id })
    console.log(offer)
    if (req.auth.level < 1 && req.auth.userId != offer.creatorId) {
      throw error
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Vous n\'avez pas la permission d\'effectuer cette requête' });
  }
};


exports.checkAdminOrOfferCreator = async function (req, res, next) {
  try {
    let offer = await Offer.find({ _id: req.params.id })
    if (req.auth.level < 1 && offer[0].creatorId != req.auth.userId) {
      throw error
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'error has occured' });
  }
};

exports.checkAdminOrCommentCreator = async function (req, res, next) {
  console.log(1)
  try {
    let comment = await Comment.findOne({ _id: req.params.idComment })
    if (comment.creatorId != req.auth.userId && req.auth.level < 1) {
      throw error
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.checkPermission = async function (req, res, next) {
  try {
    let comment = await Comment.findOne({ _id: req.params.idComment })

    let offer = await Offer.findOne({ _id: comment.offerId })

    if (!req.auth.level >= 1 && !comment.creatorId == req.auth.userId && !offer.creatorId == req.auth.userId) {
      throw error
    }
    next();
  } catch (error) {
    res.status(error).json({ error });
  }
};

exports.checkAdmin = (req, res, next) => {
  if (req.auth.level < 1) {
    res.status(401).json({ error: 'Il faut être admin pour effectuer cette requête' });
  }
  next();
};
