const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const fetchuser = (req, res, next) => {
  // get the user from the jwt token and add id to request object
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;

    next();
  } catch (error) {
    console.error(error.message);
    res
      .status(401)
      .send({ error: "Please authenticate using a valid tokens!" });
  }
};

module.exports = fetchuser;
