const express = require("express");
const router = express.Router();
const Animal = require("../models/pets");
const authenticateToken = require("../middleware/authorization");
const User = require("../models/user");

router.post("/addPet", authenticateToken, async (req, res) => {
  try {
    const newPet = new Animal({ ...req.body, ...req.user });
    await newPet.save();
    res.send(req.user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/add", authenticateToken, async (req, res) => {
  try {
    const savedPet = req.body.pet;
    const exists = await User.find({
      username: req.user.username,
      savedPets: { $in: [savedPet] },
    });

    if (exists.length === 0) {
      await User.updateOne(
        { username: req.user.username },
        { $push: { savedPets: [savedPet] } }
      );
      res.send("Pet Saved");
    } else {
      res.send("Pet already saved");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/pet/:id/adopt", authenticateToken, async (req, res) => {
  const pet = req.params.pet;
  const changeStatus = await Animal.findByIdAndUpdate(pet);
});

module.exports = router;
