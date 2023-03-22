const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFollowingList,
  updateUserPhoto,
  searchForUsers,
} = require("../controllers/user");
const ensureUserAuthenticated = require("../middleware/ensureAuth");
const upload = require("../middleware/multer");

//Get user
router.get("/", getUser);

//Search for user
router.get("/search", searchForUsers);

//Delete user
router.delete("/delete/:id", ensureUserAuthenticated, deleteUser);

//Update user
router.put("/update/:id", ensureUserAuthenticated, updateUser);

//Update user Photos
router.put(
  "/photo/:id",
  ensureUserAuthenticated,
  upload.any(),
  updateUserPhoto
);

//Follow user
router.put("/follow/:id", ensureUserAuthenticated, followUser);

//Unfollow user
router.put("/unfollow/:id", ensureUserAuthenticated, unfollowUser);

//Get Followers list
router.get("/followers/:id", getFollowingList);

module.exports = router;
