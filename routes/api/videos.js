const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Video = require("../../models/Video");

// Build a GET request for each category in the database

// @route:   GET api/videos
// @desc:    Get all videos
// @Note:    Experiment with sort to return videos in reverse order
// @access:  Public
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
