const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Animal = require("../models/pets");

router.get("/showUsers", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.get("/showAnimals", async (req, res) => {
  const pets = await Animal.find({});
  res.send(pets);
});

module.exports = router;
