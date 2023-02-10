const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../config/cloudinaryConfig");

//Create posts
const createPost = async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req?.file.path);
      if (result) {
        const cloudinaryId = result.public_id;
        const img = result.secure_url;
        const post = new Post({ ...req.body, img, cloudinaryId });
        const postCreated = await post.save();
        return res.status(200).json(postCreated);
      }
    } else {
      const post = new Post({ ...req.body });
      const postCreated = await post.save();
      return res.status(200).json(postCreated);
    }
    return res.status(200).json(postCreated);
  } catch (err) {
    return res.status(500).json({ "Post creation unsuccessful": err.message });
  }
};

//Update posts
const updatePost = async (req, res) => {
  //TODO: add cloudinary

  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("Post updated");
    } else {
      return res.status(400).json("Cannot edit another user's post");
    }
  } catch (err) {
    return res.status(500).json({ "Post update unsuccessful": err.message });
  }
};

//Get all posts from followed users (both following and followed users)
const fetchFollowedPosts = async (req, res) => {
  try {
    const requestingUser = await User.findById(req.params.id);
    const requestingUserPosts = await Post.find({ userId: requestingUser._id });
    const friendsPosts = await Promise.all(
      requestingUser.following.map(friend => Post.find({ userId: friend }))
    );
    if (friendsPosts) {
      return res.status(200).json(requestingUserPosts.concat(...friendsPosts));
    } else if (!friendsPosts && requestingUserPosts) {
      return res.status(200).json(requestingUserPosts);
    } else {
      return res.status(404).json("No Posts found");
    }
  } catch (err) {
    return res.status(500).json({ "Fetching posts unsuccessful": err.message });
  }
};

//Get a specific post from a user (singular)
const fetchUserPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json("No posts found from user");
    }
  } catch (err) {
    return res.status(500).json({ "Fetching post unsuccessful": err.message });
  }
};

//Get all posts from a specific user (multiple posts, one user)
const fetchAllUsersPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    if (user && posts) {
      console.log("line 77", user, posts);
      return res.status(200).json(posts);
    } else {
      return res.status(404).json("No posts found for that user");
    }
  } catch (err) {
    return res.status(500).json({ "Fetching posts unsuccessful": err.message });
  }
};

//Like a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found in Database");
    }
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json("Post unliked");
    }
  } catch (err) {
    return res.status(500).json({ "Post like unsuccessful": err.message });
  }
};

//Delete a post
const deletePost = async (req, res) => {
  // TODO ===>> finish
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json("Post not found in Database");
    }
    if (post.userId === req.body.userId) {
      if (post.cloudinaryId) {
        await cloudinary.uploader.destroy(post.cloudinaryId);
      }
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(400).json("Cannot delete another user's post");
    }
  } catch (err) {
    res.status(500).json({ "Post delete unsuccessful": err.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  fetchFollowedPosts,
  fetchAllUsersPosts,
  fetchUserPost,
  likePost,
  deletePost,
};
