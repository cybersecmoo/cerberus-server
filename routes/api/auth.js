const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { BCRYPT_ROUNDS, JWT_EXPIRY } = require("../../config/consts");
const logMessage = require("../../middleware/logging");

// TODO: This will need authorisation that the requesting user is an admin, or is the same as the user being viewed
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // If user not found, does this chuck an exception? Or does it just return null?

    res.json(user);
  } catch (error) {
    logMessage("ERROR", "Failed to find user by that ID");
    res.status(404).send("User not found");
  }
});

// Authenticate a user and get their token
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("password", "Enter a password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("AUDIT: Validation errors in authentication");
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password } = req.body;

    try {
      let user = await User.findOne({ name });

      if (!user) {
        logMessage("AUDIT", "Incorrect username"); // TODO: Log requester IP
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        logMessage("AUDIT", "Incorrect password"); // TODO: Log requester IP
        return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
        }
      };

      jwt.sign(payload, process.env["JWT_KEY"], { expiresIn: JWT_EXPIRY }, async (err, token) => {
        if (err) {
          throw err;
        } else {
          if (!user.hasLoggedInYet) {
            user.hasLoggedInYet = true; // FIXME: This sets even if they don't change their password
            await user.save();
            res.redirect("../users/create_password").json({ token }); // FIXME: Chucks an error atm since we don't have a GET endpoint for create_password yet
          } else {
            res.json({ token });
          }
        }
      });
    } catch (error) {
      logMessage("ERROR", "Server error in authentication: " + error);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
