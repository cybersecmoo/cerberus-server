const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { standardAuth, adminAuth } = require("../../middleware/auth");
const { BCRYPT_ROUNDS, JWT_EXPIRY } = require("../../config/consts");
const logMessage = require("../../middleware/logging");

const createUser = async req => {
  try {
    const { name, password, isAdmin } = req.body;
    let user = await User.findOne({ name });
    let created = false;

    if (!user) {
      const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
      const pw = await bcrypt.hash(password, salt);

      user = new User({
        name,
        password: pw,
        isAdmin
      });

      await user.save();
      created = true;
    }

    const payload = {
      user: {
        id: user.id
      },
      new: created
    };

    return payload;
  } catch (err) {
    throw err;
  }
};

// Registers a user (can only be done by an admin; i.e. users cannot request access themselves)
router.post(
  "/",
  [standardAuth, adminAuth],
  [
    check("password", "Enter a password of at least 10 characters").isLength({
      min: 10
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let jsonPayload = { user: "", errors: [] };
    let returnCode = 201;

    try {
      if (!errors.isEmpty()) {
        returnCode = 400;
        jsonPayload.errors = errors;
      } else {
        const userCreation = await createUser(req);
        user = userCreation.user;

        if (!userCreation.new) {
          jsonPayload.errors = [{ msg: "User already exists!" }];
          returnCode = 400;
        }

        jsonPayload = { user, errors: jsonPayload.errors };
      }
    } catch (error) {
      logMessage("ERROR", "Server error in user registration: " + error);
      returnCode = 500;
      jsonPayload.errors = [{ msg: "Server Error" }];
    } finally {
      return res.status(returnCode).json(jsonPayload);
    }
  }
);

const updatePassword = async req => {
  let success = true;
  let user = await User.findById(req.user.id);
  const { newPW } = req.body;

  if (!user) {
    success = false;
  }

  const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
  const pw = await bcrypt.hash(newPW, salt);

  user.password = pw;

  await user.save();

  return success;
};

// This will change the user's password (required on first login). User must already be logged in to call this.
// If user cannot remember their password, then the admin can delete their user and add them again
router.put(
  "/update_password",
  standardAuth,
  [
    check("password", "Enter a password of at least 10 characters").isLength({
      min: 10
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let returnCode = 200;
    let jsonPayload = { errors: [] };

    try {
      if (!errors.isEmpty()) {
        returnCode = 400;
        jsonPayload.errors = errors;
      } else {
        const updated = updatePassword(req);

        if (!updated) {
          jsonPayload.errors = [{ msg: "Could not find specified user" }];
          returnCode = 400;
        }
      }
    } catch (error) {
      console.error(err.message);
      jsonPayload.errors = [{ msg: "Server Error" }];
      returnCode = 500;
    } finally {
      return res.status(returnCode).json(jsonPayload);
    }
  }
);

module.exports = router;
