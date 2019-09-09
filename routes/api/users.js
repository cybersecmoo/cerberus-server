const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const { BCRYPT_ROUNDS, JWT_EXPIRY } = require("../../config/consts");
const logMessage = require("../../middleware/logging");

// Registers a user (can only be done by an admin; i.e. users cannot request access themselves)
router.post(
  "/",
  auth,
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("password", "Enter a password of at least 10 characters").isLength({
      min: 10
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, isAdmin } = req.body;

    if (!req.user.isAdmin) {
      logMessage("AUDIT", "Non-admin attempting admin tasks");
      return res.status(403).json({ errors: [{ msg: "You must be an admin in order to add users" }] });
    }

    try {
      let user = await User.findOne({ name });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
      const pw = await bcrypt.hash(password, salt);

      user = new User({
        name,
        password: pw,
        isAdmin
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, process.env["JWT_KEY"], { expiresIn: JWT_EXPIRY }, (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      });

      res.send("User registered");
    } catch (error) {
      logMessage("ERROR", "Server error in user registration: " + error);
      return res.status(500).send("Server Error");
    }
  }
);

// This will change the user's password (required on first login). User must already be logged in to call this.
// If user cannot remember their password, then the admin can delete their user and add them again
router.post(
  "/create_password",
  auth,
  [
    check("password", "Enter a password of at least 10 characters").isLength({
      min: 10
    })
  ],
  async (req, res) => {
    try {
      let user = await User.findById(req.user.id);
      const { newPW } = req.body;

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User does not exist" }] });
      }

      const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
      const pw = await bcrypt.hash(newPW, salt);

      user.password = pw;

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, process.env["JWT_KEY"], { expiresIn: JWT_EXPIRY }, (err, token) => {
        if (err) {
          throw err;
        } else {
          res.json({ token });
        }
      });
    } catch (error) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
