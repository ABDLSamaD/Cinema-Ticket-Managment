const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const fetchadmin = (req, res, next) => {
  // get the user from the jwt token and add id to request object
  const token = req.header("AuthToken");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = data.admin;
    next();
  } catch (error) {
    console.error(error.message);
    res
      .status(401)
      .send({ error: "Please authenticate using a valid tokens!" });
  }
};

module.exports = fetchadmin;
