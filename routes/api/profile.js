const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile modal
const Profile = require("../../models/Profile");
// Load User modal
const User = require("../../models/User");

// @route  GET api/profile/test
// @desc  Tests profile route
// @access public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// @route  GET api/profile
// @desc  get current users profile
// @access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Add this back in to make the user create a profile before continuing
        // if (!profile) {
        //   errors.noProfile = "There is no profile for this user";
        //   return res.status(404).json(errors);
        // }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
