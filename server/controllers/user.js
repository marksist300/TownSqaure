const User = require("../models/User");
const crypto = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");

const updateUser = async (req, res) => {
  //TODO: add cloudinary
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
  //TODO: add cloudinary
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

const getUser = async (req, res) => {
  const username = req.query.username;
  const userId = req.query.userId;
  try {
    const user = userId
      ? await User.findById(userId).lean()
      : await User.findOne({ username: username }).lean();
    const { password, ...rest } = user;
    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json("User not found");
  }
};

const followUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const requestingUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await requestingUser.updateOne({
          $push: { following: req.params.id },
        });
        res.status(200).json("User followed");
      } else {
        res.status(400).json("Account already followed");
      }
    } else {
      res.status(403).json("User's cannot follow themselves");
    }
  } catch (err) {
    res.status(500).json("Follow was not successful");
  }
};

const unfollowUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const requestingUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await requestingUser.updateOne({
          $pull: { following: req.params.id },
        });
        res.status(200).json("User Unfollowed");
      } else {
        res.status(400).json("Account is not followed");
      }
    } else {
      res.status(403).json("User's cannot unfollow themselves");
    }
  } catch (err) {
    res.status(500).json("Follow was not successful");
  }
};

//Get Followers List

const getFollowerList = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followers = await Promise.all(
      user.followers.map(followerId => user.findById(followerId))
    );
    const followerList = [];
    followers.forEach(follower => {
      const { _id, username, profilePic } = follower;
      followerList.push({ _id, username, profilePic });
    });
    res.status(200).json(followerList);
  } catch (error) {
    res.status(500).json("Friends list found");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFollowerList,
};
