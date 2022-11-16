const func = require('../functions/user.js');

exports.signup = (req, res, next) => {
  func.functionSignup(req, res, next);
};

exports.login = (req, res, next) => {
  func.functionLogin(req, res, next);
};

exports.editUser = (req, res, next) => {
  func.functionEditUser(req, res, next);
};

exports.editAdmin = (req, res, next) => {
  func.functionEditAdmin(req, res, next);
}

exports.getOneUser = (req, res, next) => {
  func.functionGetOneUser(req, res, next);
}

exports.getAllUsers = (req, res, next) => {
  func.functionGetAllUsers(req, res, next);
}

exports.deleteUser = (req, res, next) => {
  func.functionDeleteUser(req, res, next);
}
exports.countUsers = (req, res, next) => {
  func.functionCountUsers(req, res, next);
}