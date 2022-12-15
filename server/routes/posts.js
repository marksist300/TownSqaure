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
router.put("/update/:id", updatePost);

//Get all posts from followed users
router.get("/fetchAll/", fetchFollowedPosts);

//Get all user's posts
router.get("/fetchUser/:id", fetchUsersPosts);

//Like a post
router.put("/like/:id", likePost);

//Delete a post
router.delete("/delete/:id", deletePost);

module.exports = router;
