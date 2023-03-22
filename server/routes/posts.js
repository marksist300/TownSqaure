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
const ensureUserAuthenticated = require("../middleware/ensureAuth");

const upload = require("../middleware/multer");
//Create posts
router.post("/new", ensureUserAuthenticated, upload.single("img"), createPost);

//Update posts
router.put("/update/:id", ensureUserAuthenticated, updatePost);

//Get all posts from followed users
router.get("/fetchAll/:id", fetchFollowedPosts);

//Get all user's posts
router.get("/fetchUserPosts/:username", fetchAllUsersPosts);

//Get singular post from user
router.get("/fetchOnePost/:id");

//Like/Unlike a post
router.put("/like/:id", ensureUserAuthenticated, likePost);

//Delete a post
router.delete("/:id", ensureUserAuthenticated, deletePost);

module.exports = router;
