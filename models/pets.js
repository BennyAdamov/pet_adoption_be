const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  typeOfAnimal: String,
  status: String,
  breed: String,
  height: Number,
  weight: Number,
  color: String,
  photo: String,
  bio: String,
  hypoallergenic: Boolean,
  dietaryRestrictions: String,
  name: String,
  username: String,
});

module.exports = mongoose.model("Animal", AnimalSchema);
