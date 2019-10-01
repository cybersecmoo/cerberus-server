const jwt = require("jsonwebtoken");
const logMessage = require("./logging");
const User = require("../models/User");

const isJWT = authZHeader => {
  const isJWT = false;
  const parts = authZHeader.split(" ");

  if (parts.length === 2) {
    const scheme = parts[0];
    const creds = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      isJWT = true;
    }
  }

  return isJWT;
};

// Handles checking that the user has a valid JWT
const standardAuth = async (req, res, next) => {
  // get token from header
  const authZ = req.header("Authorization");

  if (!authZ) {
    logMessage("AUDIT", "No token supplied");
    return res.status(401).json({ errors: [{ msg: "No authorization token supplied" }] });
  }

  if (isJWT(authZ)) {
    // Verify the token itself
    jwt.verify(creds, process.env["JWT_KEY"], async (err, decoded) => {
      if (decoded) {
        req.user = decoded.user;
        const userInDB = await User.findById(req.user.id);

        if (userInDB.token !== creds) {
          logMessage("AUDIT", "Invalid token: token does not match database");
          return res.status(401).json({ errors: [{ msg: "Invalid token supplied" }] });
        }

        next();
      } else {
        logMessage("AUDIT", `Invalid token: ${err}`);
        return res.status(401).json({ errors: [{ msg: "Invalid token supplied" }] });
      }
    });
  } else {
    logMessage("AUDIT", `Malformed AuthZ Header`);
    return res.status(401).json({ errors: [{ msg: "Invalid Header" }] });
  }
};

// Ensures that (given the user is actually a valid one and is logged in etc.) the user is an admin
const adminAuth = async (req, res, next) => {
  let returnCode = 200;
  let returnPayload = { errors: [] };

  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (user) {
      if (!user.isAdmin) {
        logMessage("AUDIT", `User ${user.name} tried to access an admin endpoint`);
        returnCode = 403;
        returnPayload.errors = [{ msg: "Unauthorised" }];
      }
    } else {
      logMessage("ERROR", `User ID ${id} not found`);
      returnCode = 400;
      returnPayload.errors = [{ msg: "Bad Request" }];
    }
  } catch (error) {
    logMessage("ERROR", `Error in admin auth: ${error}`);
    returnCode = 500;
    returnPayload.errors = [{ msg: "Server Error" }];
  } finally {
    if (returnCode === 200) {
      next();
    } else {
      return res.status(returnCode).json(returnPayload);
    }
  }
};

module.exports = {
  standardAuth,
  adminAuth
};
