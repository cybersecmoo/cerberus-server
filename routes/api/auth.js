const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { BCRYPT_ROUNDS, JWT_EXPIRY } = require("../../config/consts");
const logMessage = require("../../middleware/logging");

const getUser = async req => {
  let result = { user: { id: "", isAdmin: false }, errors: [] };
  const { name, password } = req.body.user;

  try {
    let user = await User.findOne({ name });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      logMessage("AUDIT", "Incorrect password");
      result.errors = [{ msg: "Invalid credentials" }];
    }

    result.user.id = user.id;
    result.user.isAdmin = user.isAdmin;
  } catch (err) {
    logMessage("AUDIT", "Incorrect username");
    result.errors = [{ msg: "Invalid credentials" }];
  } finally {
    return result;
  }
};

// Authenticate a user and get their token
// TODO: Implement exponential backoff for AuthN requests
// TODO: Lock out after five attempts
router.post(
  "/",
  [
    check("user.name", "Name is required")
      .not()
      .isEmpty(),
    check("user.password", "Enter a password").exists()
  ],
  async (req, res) => {
    console.log("received auth request");
    let returnPayload = { token: "", errors: [] };
    let returnCode = 200;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        returnCode = 400;
        returnPayload.errors = errors.array();
      } else {
        const userResult = await getUser(req);

        if (!userResult.user.id) {
          returnCode = 400;
          returnPayload.errors = userResult.errors;
        } else {
          const user = userResult.user;
          const payload = {
            user: {
              id: user.id,
              isAdmin: user.isAdmin // TODO: Add in some user browser data (SHA-256 hashed) and also put the same in a hardened cookie. To mitigate hijacking.
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
              }
            }
          });
        }
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
