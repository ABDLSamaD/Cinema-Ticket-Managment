const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler"); // async handler is a function or you want more about this go to internet
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const sendMail = require("../mail/mail");
const verifyLogin = require("../mail/loginmail");
const checkTokenExpiry = require("../middleware/checkToken");

// creates a new variable dotenv .env path and some variable to store and your secret key put it.
const dotenv = require("dotenv");
dotenv.config();

// ROUTE 1: create a user using POST "/api/auth/createuser". No login required.
router.post(
  "/createuser",
  [
    body("name", "Enter a maximun 3 letters in the name field").isLength({
      min: 3,
    }),
    body("username", "Enter a maximun 3 letters in the name field").isLength({
      min: 3,
    }),
    body("email", "Please Enter valid email").isEmail(),
    body("password", "Password must be 5 characters at least").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there a error, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    // success if ture is anywhere
    let success = false;
    try {
      // object destructing for userData
      const { name, username, email, password, picture } = req.body;

      // hashing password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // check if an existing email
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        success = false;
        return res
          .status(400)
          .json({ message: "Email already exists!", success });
      }

      // save user or create user
      const user = await User.create({
        name,
        username,
        email,
        password: hashPassword,
        picture,
        verified: false,
      });

      // create an data var for user id to send jsonwebtoken to an user
      const data = {
        user: {
          id: user.id,
        },
      };
      // send user jwt token if he signup or create an account.
      const authToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // if user is created then send a verification email link to verify it's email
      const random = Math.floor(Math.random() * 10000);
      console.log(random);
      if (user) {
        success = true;
        sendMail(name, email, user._id, random); // this is method of email with some arguments
        return res.status(200).json({
          message: "Successfully registered account. Please Verify Email",
          success,
          authToken,
        });
      }
      res.status(404).send({ message: "Account not created" });
    } catch (error) {
      res.status(500).send("Internal server error!");
      console.error(error.message);
    }
  }
);

// ROUTE 2: Verify an user email using POST "/api/auth/emailverify". no login required. but signup require
router.put("/verify-email/:token", async (req, res) => {
  let success = false;
  try {
    const token = req.params.token;

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // this will be update verified = true that the user id which will be an available and sending a mail to verify.
    const updatedInfo = await User.updateOne(
      { _id: decodedToken.userId },
      { $set: { verified: true } }
    );
    if (updatedInfo !== true) {
      success = false;
      return res.json({
        message: "Your Email has not been Verified please verify first.",
        success,
      });
    }
    success = true;
    return res.json({
      message: "Your Email has been Verified.",
      success,
    });
  } catch (error) {
    res.status(500).send("Internal server error!");
    console.error(error.message);
  }
});

// ROUTE 3: Authentication an user using POST "/api/auth/login". no login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there a error, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    // success if ture is anywhere
    let success = false;
    try {
      // object destructing for userData
      const { email, password } = req.body;

      //   find an email
      const user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(404).json({
          error: "please try to login with correct credentials",
          success,
        });
      }

      //   password compare
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success = false;
        return res.status(404).json({
          error: "please try to login with correct credentials",
          success,
        });
      }
      // create an data var for user id to send jsonwebtoken to an user
      const data = {
        user: {
          id: user.id,
        },
      };

      // send user jwt token if he signup or create an account.
      const authToken = await jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      success = true;
      // login then this details send to an email with jsonwebtoken
      verifyLogin(user.name, email, authToken);
      res.status(200).json({
        authToken: authToken,
        message:
          "You have SuccessFully Login, Token is Sending to you in email",
        success,
      });
    } catch (error) {
      res.status(400).send("Internal server error!");
      console.error(error.message);
    }
  }
);

// ROUTE 3: Fetch an user data using POST "/api/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({ user });
  } catch (error) {
    res.status(500).send("Internal server error!");
    console.error(error.message);
  }
});

// ROUTE 3: auto logout an user using Get "/api/auth/autologout". login required.
router.get("/autologout", checkTokenExpiry, (req, res) => {
  try {
    res.status(200).send({ message: "Auto-logout successful" });
  } catch (error) {
    res.status(500).send("Internal server error!");
    console.error(error.message);
  }
});

// ROUTE 4: Delete user account using DELETE "/api/auth/deleteaccount". login required.
router.delete("/deleteaccount", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(500).json({ message: "Failed to delete user" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).send("Internal server error!");
    console.error(error.message);
  }
});

module.exports = router;
