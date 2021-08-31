const express = require("express");
const router = express.Router();
const Animal = require("../models/pets");
const User = require("../models/user");
const authenticateToken = require("../middleware/authorization");

router.put("/editPet/:_id", authenticateToken, async (req, res) => {
  const user = await User.findOne({
    $and: [{ username: req.user.username }, { isAdmin: true }],
  });
  if (user) {
    const updatedPet = await Animal.findOneAndUpdate(req.params, req.body);
    res.send("Success");
  }
});

module.exports = router;
