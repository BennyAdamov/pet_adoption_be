const express = require("express");
const router = express.Router();
const Animal = require("../models/pets");
const User = require("../models/user");
const authenticateToken = require("../middleware/authorization");

router.get("/getPetById", authenticateToken, async (req, res) => {
  const id = { username: req.user.username };
  const userId = await User.findOne(id);
  const petId = userId.savedPets;
  const pets = await Animal.find({ _id: { $in: petId } });
  res.send(pets);
});

router.delete("/deletePet/:id", authenticateToken, async (req, res) => {
  petId = req.params.id;
  const id = { username: req.user.username };
  const del = { $pull: { savedPets: petId } };
  await User.updateOne(id, del);
  res.send("success");
});

module.exports = router;
