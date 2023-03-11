const User = require("../models/User");
const crypto = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig");

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
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
      console.log("USer info reached and returned: ", user);
      res.status(200).json("User details have been updated");
    } catch (err) {
      res.status(500).json("Error updating user: ", err.message);
    }
  } else {
    return res.status(403).json("Permission not granted to edit this account.");
  }
};

const updateUserPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json("User ID Missing");
    }
    if (!req.files) {
      return res.status(400).json("Image(s) Missing");
    }

    let profilePic, cover;

    req.files.forEach(elem => {
      if (elem.fieldname === "profilePic") {
        profilePic = elem;
      } else if (elem.fieldname === "cover") {
        cover = elem;
      }
    });

    // console.log(profilePic.path, cover.path);

    //GO TO DB and search for current user image???
    //IF it exists go to cloudinary and destroy the image
    const {
      cover: oldCover,
      profilePic: oldProfilePic,
      coverId: oldCoverId,
      profilePicId: oldProfilePicId,
    } = await User.findById(id).lean();
    // console.log(user);
    // console.log("ODL IDS =S=S=S=S=S=>", oldCoverId, oldProfilePicId);
    if (oldCoverId || oldProfilePicId) {
      if (oldProfilePicId) {
        await cloudinary.uploader.destroy(oldProfilePicId);
      }
      if (oldCoverId) {
        await cloudinary.uploader.destroy(oldCoverId);
      }
    }
    //THEN:
    //Set the photo(s) on cloudinary and respond so they can be set into the DB and into state

    const newProfilePic = {};
    const newCover = {};
    if (profilePic) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        profilePic.path
      );
      public_id ? (newProfilePic.newProfilePicId = public_id) : null;
      secure_url ? (newProfilePic.newProfilePicUrl = secure_url) : null;
    }
    if (cover) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        cover.path
      );
      public_id ? (newCover.newCoverId = public_id) : null;
      secure_url ? (newCover.newCoverUrl = secure_url) : null;
    }

    const updatePhotoInDB = await User.findByIdAndUpdate(
      id,
      {
        cover: newCover.newCoverUrl,
        coverId: newCover.newCoverId,
        profilePic: newProfilePic.newProfilePicUrl,
        profilePicId: newProfilePic.newProfilePicId,
      },
      { new: true }
    ).lean();

    if (updatePhotoInDB) {
      return res.status(200).json({
        coverPhotoId: newCover.newCoverId,
        coverPhotoUrl: newCover.newCoverUrl,
        profilePicId: newProfilePic.newProfilePicId,
        profilePicUrl: newProfilePic.newProfilePicUrl,
      });
    } else {
      return res.status(500).json({ Error_Updating_User_Image: error });
    }
  } catch (error) {
    return res.status(500).json({ Error_updating_User_Image: error });
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
    if (req.body.currentUserId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const requestingUser = await User.findById(req.body.currentUserId);
      if (!user.followers.includes(req.body.currentUserId)) {
        await user.updateOne({ $push: { followers: req.body.currentUserId } });
        await requestingUser.updateOne({
          $push: { following: req.params.id },
        });
        return res.status(200).json("User followed");
      } else {
        return res.status(400).json("Account already followed");
      }
    } else {
      return res.status(403).json("User's cannot follow themselves");
    }
  } catch (err) {
    return res.status(500).json("Follow was not successful");
  }
};

const unfollowUser = async (req, res) => {
  try {
    if (req.body.currentUserId !== req.params.id) {
      const user = await User.findById(req.params.id);
      // console.log("user from page:", user);
      const requestingUser = await User.findById(req.body.currentUserId);
      // console.log("current user: ", requestingUser);
      if (user.followers.includes(req.body.currentUserId)) {
        await user.updateOne({ $pull: { followers: req.body.currentUserId } });
        await requestingUser.updateOne({
          $pull: { following: req.params.id },
        });
        return res.status(200).json("User Unfollowed");
      } else {
        return res.status(400).json("Account is not followed");
      }
    } else {
      return res.status(403).json("User's cannot unfollow themselves");
    }
  } catch (err) {
    return res.status(500).json("Follow was not successful");
  }
};

//Get Followers List

const getFollowingList = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const following = await Promise.all(
      user.following.map(followingId => User.findById(followingId))
    );
    const followingList = [];
    following.forEach(follow => {
      const { _id, username, profilePic } = follow;
      followingList.push({ _id, username, profilePic });
    });
    res.status(200).json(followingList);
  } catch (error) {
    res.status(500).json({ "Friends list not found": error });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFollowingList,
  updateUserPhoto,
};
