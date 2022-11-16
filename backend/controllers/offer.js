const func = require('../functions/offer.js');

exports.getAllOffers = (req, res, next) => {
  func.functiongetAllOffres(req, res, next);
};

exports.getOffer = (req, res, next) => {
  func.functionGetOneOffer(req, res, next);
};

exports.createOffer = (req, res, next) => {
  func.functionCreateOffer(req, res, next);
}

exports.editOffer = (req, res, next) => {
  func.functionEditOffer(req, res, next);
}

exports.deleteOffer = (req, res, next) => {
  func.functionDeleteOffer(req, res, next);
}

exports.getAllOffersByUserId = (req, res, next) => {
  func.functiongetAllOffersByUserId(req, res, next);
}
exports.countAllOffersByUser = (req, res, next) => {
  func.functionCountAllOffersByUserId(req, res, next);
}

exports.getAllOffersByCategories = (req, res, next) => {
  func.functiongetAllOffersByCategories(req, res, next);
} 

exports.countOffers = (req, res, next) => {
  func.functionCountOffers(req, res, next);
}
