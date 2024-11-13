const express = require("express");
const router = express.Router();
const Movies = require("../models/moviesUser");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Add an user details using an POST "/api/movies/userdetails" login required
router.post(
  "/userdetails",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  fetchuser,
  asyncHandler(async (req, res) => {
    // if there a error, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    let success = false;
    try {
      const { name, email, phoneNumber, city } = req.body;
      // check if an existing email
      const existingEmail = await Movies.findOne({ email });
      if (existingEmail) {
        success = false;
        return res
          .status(400)
          .json({ success, message: "Email already exists!" });
      }
      const user = await Movies.create({
        name,
        email,
        phoneNumber,
        city,
        user: req.user.id,
      });

      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "User Details Not Added!" });
      }
      // send user jwt token if he signup or create an account.
      success = true;
      res.json({ user, success, message: "User Added Success." });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Internal Server Error!" });
    }
  })
);

// ROUTE 1: Fetch an users of only user detail using an POST "/api/movies/userdetails" login required
router.get("/getuserdetails", fetchuser, async (req, res) => {
  try {
    const movie = await Movies.find({ user: req.user.id });
    res.send(movie);
  } catch (error) {
    res.status(500).send("Internal server error!");
    console.error(error.message);
  }
});

module.exports = router;
