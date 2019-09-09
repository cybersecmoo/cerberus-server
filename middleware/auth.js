const jwt = require("jsonwebtoken");
const logMessage = require("./logging");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("Authorization");

  if (!token) {
    logMessage("AUDIT", "No token supplied"); // TODO: Log requester IP?
    return res.status(401).json({ errors: [{ msg: "No authorization token supplied" }] });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env["JWT_KEY"]);
    req.user = decoded.user;

    next();
  } catch (error) {
    logMessage("AUDIT", "Invalid token"); // TODO: Log requester IP?
    res.status(401).json({ errors: [{ msg: "Invalid token supplied" }] });
  }
};
