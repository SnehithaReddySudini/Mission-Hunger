const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function (req, res, next) {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  const token = header.startsWith("Bearer ") ? header.slice(7) : header;

  try {
    const decoded = jwt.verify(token, keys.secretOrKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};