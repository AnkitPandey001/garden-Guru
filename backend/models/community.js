const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema.Types;

const postContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedBy: {
    _id: {
      type: ObjectID,
      ref: "USER",
    },
    name: String,
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectID,
    ref: "USER",
  },
  posts: [postContentSchema],
});

const COMMUNITY = mongoose.model('COMMUNITY', postSchema);
module.exports = COMMUNITY;