const express = require("express");
const router = express.Router();
const Animal = require("../models/pets");
const filterQuery = require("../middleware/filterQuery");

router.get("/advancedSearch", filterQuery, async (req, res) => {
  const result = await Animal.find({ ...req.query });
  res.send(result);
});

router.get("/getPet/:_id", async (req, res) => {
  const pet = await Animal.findById(req.params);
  res.send(pet);
});

module.exports = router;
