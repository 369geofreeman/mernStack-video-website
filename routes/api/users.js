const express = require("express");
const router = express.Router();
const bCrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load user modal
const User = require("../../models/User");

// @route  GET api/users/test
// @desc  Tests users route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Users works BITCH" }));

// @route  GET api/users/register
// @desc  register a user
// @access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bCrypt.genSalt(10, (err, salt) => {
        bCrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET api/users/login
// @desc  Login User / Returning JWT Token
// @access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  //  Find the user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check password
    bCrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        const payload = {
          id: user.id,
          name: user.name
        }; // Create JWT payLoad

        // Signed Token
        JWT.sign(
          payload,
          keys.secretorkey,
          { expiresIn: 4233600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET api/users/current
// @desc  Return current user
// @access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
