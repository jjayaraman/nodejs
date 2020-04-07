"use strict";
var express = require("express");
var router = express.Router();
// const passport = require("passport"),
//   LocalStrategy = require("passport-local").Strategy;
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
// router.post("/login", passport.authenticate("local"), function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.redirect("/users/" + req.user.username);
// });
module.exports = router;
