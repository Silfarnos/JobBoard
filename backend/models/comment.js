const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');

const commentSchema = mongoose.Schema({
  description: { type: String, required: true },
  creatorId: { type: String, required: true },
  createTime: { type: Number, required: true },
  updateTime: { type: Number, required: true },
  offerId: { type: String, required: true },
  fileBuffer: { type: Buffer},
  firstQuestionAnswer: { type: String},
  secondQuestionAnswer: { type: String},
  thirdQuestionAnswer: { type: String},
  creatorName: { type: String, required: true },
  creatorLastName: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  creatorPhone: { type: String, required: true },
  randomNumber: { type: String },
});

commentSchema.plugin(MongooseErrors);
module.exports = mongoose.model('Comment', commentSchema);