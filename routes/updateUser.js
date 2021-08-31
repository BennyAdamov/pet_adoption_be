const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/authorization");
const jwt = require("jsonwebtoken");
const changePassword = require("../middleware/changePassword");

router.post(
  "/updateUser",
  authenticateToken,
  changePassword,
  async (req, res) => {
    const query = { username: req.user.username };
    const updates = req.body;
    const newUser = { username: req.body.username };

    await User.findOneAndUpdate(query, updates, function (err, doc) {
      if (err) return res.send(500, { error: err });
    });

    const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
  }
);

module.exports = router;
