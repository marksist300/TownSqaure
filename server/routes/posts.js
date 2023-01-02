const router = require("express").Router();
const {
  createPost,
  updatePost,
  fetchFollowedPosts,
  fetchAllUsersPosts,
  fetchUserPost,
  likePost,
  deletePost,
} = require("../controllers/posts");

//Create posts
router.post("/new", createPost);

//Update posts
router.put("/update/:id", updatePost);

//Get all posts from followed users
router.get("/fetchAll/:id", fetchFollowedPosts);

//Get all user's posts
router.get("/fetchUserPosts/:username", fetchAllUsersPosts);

//Get singular post from user
router.get("/fetchOnePost/:id");

//Like/Unlike a post
router.put("/like/:id", likePost);

//Delete a post
router.delete("/delete/:id", deletePost);

module.exports = router;
