const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Video Model
const Video = require("../../models/Videos");
// Validation
const validateVideoInput = require("../../validation/video");

// @route  GET api/videos/test
// @desc  Tests videos route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Videos works" }));

// @route  POST api/videos
// @desc  Post video
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVideoInput(req.body);

    // Check validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      title: req.body.title,
      vidLink: req.body.vidLink,
      category: req.body.category,
      categoryTag: req.user.categoryTag,
      thumbNail: req.user.thumbnail
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
