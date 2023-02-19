const jwt = require("jsonwebtoken");

// Create a token 🥇 and return it
function createToken(user) {
  const payload = {
    id: user.id,
    loggedIn: "success",
  };
  return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = { createToken };
