const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth = require("../../middleware/auth");
const nodeMailer = require("nodemailer");

const User = require("../../models/User");

// @route:   GET api/auth
// @desc:    Auth Route
// @access:  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route:   POST api/auth
// @desc:    Authenticate user and get token
// @access:  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
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

// @route:   GET api/auth/forgot_password
// @desc:    Get email for forgotten password
// @access:  Public
router.get("/forgot_password", (req, res) => {
  res.render("forgot_password");
});

// @route:   POST api/auth/forgot_password
// @desc:    Post email for forgotten password
// @notes:   https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required
// @access:  Public
router.post(
  "/forgot_password",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      let token = await crypto.randomBytes(20).toString("hex");
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      user.resetPasswordToken = token;
      user.resetPasswordExpires = (await Date.now()) + 36000000; // 1 hour

      await user.save(token);

      let smtpTransport = await nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: "geofreeman369@gmail.com",
          pass: "kkrybqvocmmvanug",
        },
      });
      let mailOptions = {
        to: user.email,
        from: "geofreeman369@gmail.com",
        subject: "xHooked Password Reset (.)(.)",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your xHooked account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://localhost:3000" +
          // req.headers.host +
          "/reset_password/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain secure.\n",
      };
      await smtpTransport.sendMail(mailOptions, function (err) {
        if (err) return console.error(err);
        return res.json({ Sent: [{ msg: `Email sent to ${user.email}` }] });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route:   GET api/auth/forgot_password/:token
// @desc:    Get password token
// @note:    DONT NEED - DELETE
// @access:  Public
router.get("/reset_password/:token", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Password reset token is invalid or expired" }],
        });
      } else {
        res.render("reset", { token: req.params.token });
      }
    }
  );
});

// @route:   POST api/auth/reset_password/:token
// @desc:    Set new password
// @access:  Public
router.post(
  "/reset_password/:token",
  [
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { password, token } = req.body;

    try {
      let user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      user.resetPasswordToken = await undefined;
      user.resetPasswordExpires = await undefined;
      return res.json({ Changed: [{ msg: `Password changed` }] });
    } catch (err) {
      console.llog("FALED");
      return res.status(400).json({
        errors: [{ msg: "Password reset token is invalid or expired" }],
      });
    }
  }
);

module.exports = router;
