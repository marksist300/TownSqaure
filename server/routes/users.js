const router = require("express").Router();
const { updateUser } = require("../controllers/user");
//Get user
router.get("/", (req, res) => {
  res.send("<h1>User homepage</h1>");
});

//Delete user

//Update user
router.put("/update/:id", updateUser);
//Follow user

//Unfollow user
module.exports = router;
