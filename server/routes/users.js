const router = require("express").Router();
const { updateUser, deleteUser } = require("../controllers/user");
//Get user
router.get("/", (req, res) => {
  res.send("<h1>User homepage</h1>");
});

//Delete user
router.delete("/delete/:id", deleteUser);
//Update user
router.put("/update/:id", updateUser);
//Follow user

//Unfollow user
module.exports = router;
