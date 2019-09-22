const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { BCRYPT_ROUNDS, JWT_EXPIRY } = require("../../config/consts");
const logMessage = require("../../middleware/logging");

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
    let returnPayload = { token: "", errors: [] };
    let returnCode = 200;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        returnCode = 400;
        returnPayload.errors = errors.array();
      } else {
        const { name, password } = req.body;

        let user = await User.findOne({ name });

        if (!user) {
          logMessage("AUDIT", "Incorrect username"); // TODO: Log requester IP
          returnCode = 400;
          returnPayload.errors = [{ msg: "Invalid credentials" }];
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
          logMessage("AUDIT", "Incorrect password"); // TODO: Log requester IP
          returnCode = 400;
          returnPayload.errors = [{ msg: "Invalid credentials" }];
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
            returnPayload.token = token;

            if (!user.hasLoggedInYet) {
              user.hasLoggedInYet = true; // FIXME: This sets even if they don't change their password
              await user.save();
              res.redirect("../users/create_password"); // FIXME: Chucks an error atm since we don't have a GET endpoint for create_password yet
            }
          }
        });
      }
    } catch (error) {
      logMessage("ERROR", "Server error in authentication: " + error);
      returnCode = 500;
      returnPayload.errors = [{ msg: "Server Error" }];
    } finally {
      return res.status(returnCode).json(returnPayload);
    }
  }
);

module.exports = router;
