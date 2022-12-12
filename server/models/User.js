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
  cover: {
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
});

module.exports = mongoose.model("User", User);
