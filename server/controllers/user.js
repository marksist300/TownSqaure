const User = require("../models/User");
const crypto = require("crypto");

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await crypto.genSalt(10);
        req.body.password = await crypto.Hash(req.body.password, salt);
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

module.exports = { updateUser };
