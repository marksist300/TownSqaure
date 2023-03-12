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
const upload = require("../middleware/multer");

//Get user
router.get("/", getUser);

//Search for user
router.get("/search", searchForUsers);

//Delete user
router.delete("/delete/:id", deleteUser);

//Update user
router.put("/update/:id", updateUser);

//Update user Photos
router.put("/photo/:id", upload.any(), updateUserPhoto);

//Follow user
router.put("/follow/:id", followUser);

//Unfollow user
router.put("/unfollow/:id", unfollowUser);

//Get Followers list
router.get("/followers/:id", getFollowingList);

module.exports = router;
