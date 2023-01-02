const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema({
  userId: {
    required: true,
    type: String,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
    max: 500,
  },
  likes: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Post", Post);
