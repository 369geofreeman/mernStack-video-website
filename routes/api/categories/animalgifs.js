const express = require("express");
const router = express.Router();
module.exports = router;
const auth = require("../../../middleware/auth");

const Video = require("../../../models/categories/AnimalGifs");

// @route:   GET api/categories/animalgifs
// @desc:    Get all animalgifs videos
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
