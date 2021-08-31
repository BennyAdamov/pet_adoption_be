const express = require("express");
const router = express.Router();
const Animal = require("../models/pets");

router.get("/petFeed", async (req, res) => {
  const feed = await Animal.find();
  res.send(feed);
});

module.exports = router;
