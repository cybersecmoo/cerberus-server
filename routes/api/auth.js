const express = require("express");
const router = express.Router();
const { standardAuth } = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { BCRYPT_ROUNDS, JWT_EXPIRY } = require("../../config/consts");
const logMessage = require("../../middleware/logging");

const getUser = async req => {
  let result = { user: { id: "", name: "", isAdmin: false, hasChangedPassword: false, token: "" }, errors: [] };
  const { name, password } = req.body;

  try {
    let user = await User.findOne({ name }).select("+password +hasChangedPassword +token"); // FIXME: Injectable? Not easily, but worth giving a check when pentesting
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      logMessage("AUDIT", "Incorrect password");
      result.errors = [{ msg: "Invalid credentials" }];
    }

    result.user = user;
  } catch (err) {
    logMessage("AUDIT", `Incorrect credentials: ${err}`);
    result.errors = [{ msg: "Invalid credentials" }];
    result.user = { id: null };
  } finally {
    return result;
  }
};

const tokenIsValid = token => {
  let valid = false;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env["JWT_KEY"]);

      if (decoded) {
        valid = true;
      }
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        valid = false;
      } else {
        throw err;
      }
    }
  }

  return valid;
};

// Authenticate a user and get their token
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
      .trim()
      .escape(),
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
        const userResult = await getUser(req);
        const user = userResult.user;
        const validToken = await tokenIsValid(user.token);

        if (userResult.errors !== undefined && userResult.errors != 0) {
          returnCode = 400;
          returnPayload.errors = userResult.errors;

          return res.status(returnCode).json(returnPayload);
        } else if (user.token && validToken === true) {
          returnPayload.token = user.token;

          return res.status(returnCode).json(returnPayload);
        }

        const payload = {
          user: {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            hasLoggedInYet: user.hasChangedPassword
          }
        };

        jwt.sign(payload, process.env["JWT_KEY"], { expiresIn: JWT_EXPIRY }, async (err, token) => {
          if (err) {
            throw err;
          } else {
            returnPayload.token = token;
            user.token = token;
            await user.save();

            return res.status(returnCode).json(returnPayload);
          }
        });
      }
    } catch (error) {
      logMessage("ERROR", "Server error in authentication: " + error);
      returnCode = 500;
      returnPayload.errors = [{ msg: "Server Error" }];
      return res.status(returnCode).json(returnPayload);
    }
  }
);

router.delete("/", standardAuth, async (req, res) => {
  let returnCode = 200;
  let returnPayload = {
    errors: []
  };

  try {
    const name = req.user.name;
    let user = await User.findOne({ name });
    user.token = "";
    await user.save();
  } catch (error) {
    logMessage("ERROR", `Server error when logging out: ${error}`);
    returnPayload.errors = [{ msg: "Server Error" }];
    returnCode = 500;
  } finally {
    return res.status(returnCode).json(returnPayload);
  }
});

module.exports = router;
