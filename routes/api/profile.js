const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// THis is set up for the expansion of user profile.
// It enables the option to add more info on the user and allow them to upload videos etc

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    // only populate from user document if profile exists
    res.json(profile.populate("user", ["name"]));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private

router.post("/", auth, async (req, res) => {
  const { savedVids } = req.body;

  // Build Profile obj
  const profileFields = {};
  profileFields.user = req.user.id;
  if (savedVids) profileFields.savedVids = savedVids;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile
// @desc     get all profiles
// @access   Private
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete user profile and post
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/profile/savevid
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

    const { title, vidLink, category, categoryTag } = req.body;

    const newVid = {
      title,
      vidLink,
      category,
      categoryTag
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // Check to see if video already saved by user - (currently useing vidLink as they are unique from reddit per post)
      if (
        profile.savedVids.filter(vid => vid.vidLink === newVid.vidLink).length >
        0
      ) {
        return res.status(400).json({ msg: "Video already saved" });
      }

      profile.savedVids.unshift(newVid);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/profile/savevid/:vid_id
// @desc     Delete saved video from profile
// @access   Private
router.delete("/savevid/:vid_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index
    const removeIndex = profile.savedVids
      .map(item => item.id)
      .indexOf(req.params.vid_id);

    profile.savedVids.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/savevid
// @desc     Get all saved vids
// @access   Private
router.get("/savevid", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    const videos = await profile.savedVids;

    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
