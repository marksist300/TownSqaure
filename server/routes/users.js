const router = require("express").Router();
const { updateUser, deleteUser, getUser } = require("../controllers/user");
//Get user
router.get("/:id", getUser);

//Delete user
router.delete("/delete/:id", deleteUser);
//Update user
router.put("/update/:id", updateUser);
//Follow user

//Unfollow user
module.exports = router;
