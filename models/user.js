const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  displayName: String,
  name: { familyName: String, givenName: String },
  phone: Number,
  savedPets: Array,
  isAdmin: Boolean,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
