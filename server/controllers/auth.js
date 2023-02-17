const User = require("../models/User");
const crypto = require("bcrypt");
const { createToken } = require("../config/jwt");
jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    //creat salt and hash the user's password
    const salt = await crypto.genSalt(12);
    const hashedPW = await crypto.hash(req.body.password, salt);

    //create the user with the hashed password
    const createUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPW,
    });

    // server's response to signup request
    const user = await createUser.save();
    const token = createToken(user);

    return res.status(200).json({ username: user.username, token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const login = async (req, res) => {
  try {
    //find user based on email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User Not Found");
    } else if (user) {
      //check the password validity
      const validateUserPW = await crypto.compare(
        req.body.password,
        user.password
      );
      if (!validateUserPW) {
        return res.status(400).json("Incorrect Password");
      } else if (validateUserPW) {
        return res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { signup, login };
