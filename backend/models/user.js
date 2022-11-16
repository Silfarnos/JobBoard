const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const MongooseErrors = require('mongoose-errors');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageBuffer: { type: Buffer, required: true },
  profileImageType: { type: String, required: true},
  CV_Buffer: { type: Buffer },
  pseudo: { type: String, required: true},
  level: { type: Number, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  reponseId: { type: [String], required: true },
  postId: { type: [String], required: true },
  emailVerified: { type: Boolean, required: true },
  createTime: { type: Number, required: true },
});

//Plugin pour afficher les erreurs de manière plus claire et autoriser un seul compte par email
userSchema.plugin(uniqueValidator);
userSchema.plugin(MongooseErrors);

module.exports = mongoose.model('User', userSchema);