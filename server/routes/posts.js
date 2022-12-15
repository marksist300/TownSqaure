const router = require("express").Router();
const {
  createPost,
  updatePost,
  fetchFollowedPosts,
  fetchUsersPosts,
  likePost,
  deletePost,
} = require("../controllers/posts");

//Create posts
router.post("/new", createPost);

//Update posts
router.put("/update", updatePost);

//Get all posts from followed users
router.get("/fetchAll", fetchFollowedPosts);

//Get all user's posts
router.get("/fetchUser", fetchUsersPosts);

//Like a post
router.put("/like", likePost);

//Delete a post
router.delete("/delete", deletePost);

module.exports = router;
