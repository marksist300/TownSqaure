const jwt = require("jsonwebtoken");

function ensureUserAuthenticated(req, res, next) {
  // expect token to be in request heades
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorisation token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(JSON.parse(token), process.env.SECRET_KEY);

    //passing the verifiedUser to the controller function for any further auth checks that might be needed
    req.verifiedUser = id;
    return next();
  } catch (error) {
    return res.status(400).json({ Error: "User must be logged in." });
  }
}

module.exports = ensureUserAuthenticated;
