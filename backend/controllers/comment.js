const func = require('../functions/comment');

exports.createComment = async (req, res, next) => {
  func.functionCreateComment(req, res, next);
};

exports.getAllComments = async (req, res, next) => {
  func.functiongetAllComments(req, res, next);
}

exports.getOneComment = async (req, res, next) => {
  func.functionGetOneComment(req, res, next);
}

exports.editComment = async (req, res, next) => {
  func.functionEditComment(req, res, next);
}

exports.deleteComment = async (req, res, next) => {
  func.functionDeleteComment(req, res, next);
}

exports.getOneUserComments = async (req, res, next) => {
  func.functionGetOneUserComments(req, res, next);
}
exports.countComments = async (req, res, next) => {
  func.functionCountComments(req, res, next);
}
exports.getOneOfferComments = async (req, res, next) => {
  func.functionGetOneOfferComments(req, res, next);
}
