const Post = require("../models/Post");
const User = require("../models/User");
//Create posts
const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const postCreated = await post.save();
    res.status(200).json(postCreated);
  } catch (err) {
    res.status(500).json("Post creation unsuccessful", err.message);
  }
};

//Update posts
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(400).json("Cannot edit another user's post");
    }
  } catch (err) {
    res.status(500).json("Post update unsuccessful", err.message);
  }
};

//Get all posts from followed users
const fetchFollowedPosts = async (req, res) => {
  try {
    const requestingUser = await User.findById(req.body.userId);
    const requestingUserPosts = await Post.find({ userId: requestingUser._id });
    const friendsPosts = await Promise.all(
      requestingUser.following.map(friend => Post.find({ userId: friend }))
    );
    res.status(200).json([...requestingUserPosts, ...friendsPosts]);
  } catch (err) {
    res.status(500).json("Fetching posts unsuccessful", err.message);
  }
};

//Get all user's posts
const fetchUsersPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json("Fetching post unsuccessful", err.message);
  }
};

//Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post unliked");
    }
  } catch (err) {
    res.status(500).json("Post like unsuccessful", err.message);
  }
};

//Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(400).json("Cannot delete another user's post");
    }
  } catch (err) {
    res.status(500).json("Post delete unsuccessful", err.message);
  }
};

module.exports = {
  createPost,
  updatePost,
  fetchFollowedPosts,
  fetchUsersPosts,
  likePost,
  deletePost,
};
