const jwt = require("jsonwebtoken");

const checkTokenExpiry = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token is expired or invalid" });
  }
};

module.exports = checkTokenExpiry;
