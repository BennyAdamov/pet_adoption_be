const express = require("express");
const User = require("../models/user");

module.exports = function changePassword(req, res, next) {
  if (
    req.body.oldpassword === undefined &&
    req.body.newpassword === undefined
  ) {
    return next();
  }
  User.findOne({ username: req.user.username }, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!user) {
        res.status(400).send(err);
      } else {
        user.changePassword(
          req.body.oldpassword,
          req.body.newpassword,
          function (err) {
            if (err) {
              if (err.name === "IncorrectPasswordError") {
                res.status(400).send("Incorrect passoword");
              } else {
                res.status(400).send(err);
              }
            } else {
              res.send("Your password changed successfully");
            }
          }
        );
      }
    }
  });
  next();
};
