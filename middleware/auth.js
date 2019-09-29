const jwt = require("jsonwebtoken");
const logMessage = require("./logging");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  // get token from header
  const authZ = req.header("Authorization");

  if (!authZ) {
    logMessage("AUDIT", "No token supplied");
    return res.status(401).json({ errors: [{ msg: "No authorization token supplied" }] });
  }

  const parts = authZ.split(" ");

  if (parts.length === 2) {
    const scheme = parts[0];
    const creds = parts[1];

    // Make sure it's a Bearer token
    if (/^Bearer$/i.test(scheme)) {
      // Verify the token itself
      jwt.verify(creds, process.env["JWT_KEY"], (err, decoded) => {
        if (decoded) {
          req.user = decoded.user; // TODO: Once the browser fingerprint is added to the JWT in `routes/api/auth`, verify it here by comparing it to the...cookie?
          const userInDB = await User.findOne({ name: req.user.name });

          if(userInDB.token !== creds) {
            logMessage("AUDIT", "Invalid token: token does not match database");
            return res.status(401).json({ errors: [{ msg: "Invalid token supplied" }] });
          }

          next();
        } else {
          logMessage("AUDIT", `Invalid token: ${err}`);
          return res.status(401).json({ errors: [{ msg: "Invalid token supplied" }] });
        }
      });
    }
  } else {
    logMessage("AUDIT", `Malformed AuthZ Header`);
    return res.status(401).json({ errors: [{ msg: "Invalid Header" }] });
  }
};
