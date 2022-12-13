const User = require("../models/User");
const crypto = require("bcrypt");

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await crypto.genSalt(10);
        req.body.password = await crypto.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err.message);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("User details have been updated");
    } catch (err) {
      res.status(500).json("Error updating user: ", err.message);
    }
  } else {
    return res.status(403).json("Permission not granted to edit this account.");
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findOneAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json("Error deleteing user: ", err.message);
    }
  } else {
    return res
      .status(403)
      .json("Permission not granted to delete this account.");
  }
};

module.exports = { updateUser, deleteUser };
