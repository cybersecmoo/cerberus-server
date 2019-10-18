const jwt = require("jsonwebtoken");
const logMessage = require("./logging");
const User = require("../models/User");

const isValidJWT = authZHeader => {
  let isJWT = false;
  let creds = "";
  const parts = authZHeader.split(" ");

  if (parts.length === 2) {
    const scheme = parts[0];
    creds = parts[1];

    if (/^Bearer$/i.test(scheme)) {
      isJWT = true;
    }
  }

  return { isJWT, creds };
};

const jwtErrorResponse = res => {
  logMessage("AUDIT", "Invalid token");
  res.status(401).json({ errors: [{ msg: "Invalid token supplied" }] });
};

// Handles checking that the user has a valid JWT
const standardAuth = async (req, res, next) => {
  // get token from header
  const authZ = req.header("Authorization");

  if (!authZ) {
    logMessage("AUDIT", "No token supplied");
    return res.status(401).json({ errors: [{ msg: "No authorization token supplied" }] });
  }

  const { isJWT, creds } = isValidJWT(authZ);

  if (isJWT) {
    // Verify the token itself
    jwt.verify(creds, process.env["JWT_KEY"], async (err, decoded) => {
      try {
        if (decoded) {
          req.user = decoded.user;
          const userInDB = await User.findById(req.user.id).select("+token");

          if (userInDB.token !== creds) {
            jwtErrorResponse(res);
          }

          next();
        } else {
          jwtErrorResponse(res);
        }
      } catch (err) {
        jwtErrorResponse(res);
      }
    });
  } else {
    jwtErrorResponse(res);
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
