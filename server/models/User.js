const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    max: 40,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
  profilePicId: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: "",
  },
  coverId: {
    type: String,
    default: "",
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    max: 120,
  },
  location: {
    type: String,
    max: 50,
  },
  hometown: {
    type: String,
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
});
User.index({ username: "text", email: "text", description: "text" });
module.exports = mongoose.model("User", User);
