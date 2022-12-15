const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require("../controllers/user");
//Get user
router.get("/:id", getUser);

//Delete user
router.delete("/delete/:id", deleteUser);

//Update user
router.put("/update/:id", updateUser);

//Follow user
router.put("/follow/:id", followUser);

//Unfollow user
router.put("/unfollow/:id", unfollowUser);

module.exports = router;
