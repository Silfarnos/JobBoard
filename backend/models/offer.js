const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');

const offerSchema = mongoose.Schema({
  description: { type: String, required: true },
  shortDecription: { type: String, required: true },
  creatorId: { type: String, required: true },
  title: { type: String, required: true },
  createTime: { type: Number, required: true },
  updateTime: { type: Number, required: true },
  commentId: { type: [String], required: true },
  wages: { type: String, required: true },
  location: { type: String, required: true },
  workingTime: { type: String, required: true },
  keywords: { type: [String], required: true },
  contractType: { type: [String], required: true },
  firstQuestion: { type: String},
  secondQuestion: { type: String},
  thirdQuestion: { type: String},
  creatorName: { type: String, required: true },
  creatorImage: { type: Buffer, required: true },
  creatorImageType: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  randomNumber: { type: String }
});

offerSchema.plugin(MongooseErrors);
module.exports = mongoose.model('Offer', offerSchema);