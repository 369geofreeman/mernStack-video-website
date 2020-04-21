const express = require("express");
const router = express.Router();

// @route  GET api/videos/test
// @desc  Tests videos route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Videos works" }));

module.exports = router;
