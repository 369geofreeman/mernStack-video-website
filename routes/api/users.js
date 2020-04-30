const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route:   POST api/users
// @desc:    Register User
// @access:  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, savedVids } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ name, email, password, savedVids });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 4233600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    PUT api/users/savevid
// @desc     Add saved video
// @access   Private
router.put(
  "/savevid",
  [
    auth,
    [
      check("vidLink", "Video link is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, vidLink, category, categoryTag, thumbNail } = req.body;

    const newVid = {
      title,
      vidLink,
      category,
      categoryTag,
      thumbNail
    };

    try {
      const user = await User.findById(req.user.id);
      // Check to see if video already saved by user - (currently useing vidLink as they are unique from reddit per post)
      if (
        user.savedVids.filter(vid => vid.vidLink === newVid.vidLink).length > 0
      ) {
        return res.status(400).json({ msg: "Video already saved" });
      }

      user.savedVids.unshift(newVid);

      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/users/savevid/:vid_id
// @desc     Delete saved video
// @access   Private
router.delete("/savevid/:vid_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // get remove index
    const removeIndex = user.savedVids
      .map(item => item.id)
      .indexOf(req.params.vid_id);

    user.savedVids.splice(removeIndex, 1);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/users/savevid
// @desc     Get all saved vids
// @access   Private
router.get("/savevid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const videos = await user.savedVids;

    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
