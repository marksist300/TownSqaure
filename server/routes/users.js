const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>User homepage</h1>");
});

module.exports = router;
