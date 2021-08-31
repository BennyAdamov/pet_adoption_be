require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authorization");

router.post("/signup", (req, res) => {
  const userName = `${req.body.firstName} ${req.body.lastName}`;
  const newUser = new User({
    username: req.body.email,
    displayName: userName,
    name: { familyName: req.body.lastName, givenName: req.body.firstName },
    phone: req.body.phoneNumber,
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) return console.log(error);
    passport.authenticate("local");
    res.send(`Succesfuly signed up as ${user}`);
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const username = req.body.username;
  const isAdmin = req.user.isAdmin;
  console.log(isAdmin);
  const user = { username: username, isAdmin: isAdmin };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken, isAdmin: isAdmin });
});

router.get("/user", authenticateToken, async (req, res) => {
  const userName = await User.findOne({ username: req.user.username });
  res.send(userName);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("User logged out");
});

module.exports = router;
