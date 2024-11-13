const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchadmin = require("../middleware/fetchadmin");
const Admin = require("../models/adminauth");

// creates a new variable dotenv .env path and some variable to store and your secret key put it.
const dotenv = require("dotenv");
dotenv.config();

// ROUTE-1: Register only Admin Using POST "/api/adminauth/register" no loin required
router.post("/register", async (req, res) => {
  let success = false;
  try {
    const { name, email, password } = req.body;

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // const existingEmail = Admin.findOne({ email });
    // if (existingEmail) {
    //   success = false;
    //   return res
    //     .status(400)
    //     .json({ message: "Email already exists!", success });
    // }

    // save user or create user
    const admin = await Admin.create({
      name,
      email,
      password: hashPassword,
      verified: true,
      isAdmin: true,
    });

    // create an data var for user id to send jsonwebtoken to an user
    const data = {
      admin: {
        id: admin.id,
      },
    };
    // send user jwt token if he signup or create an account.
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    if (admin) {
      success = true;
      return res
        .status(400)
        .json({ success, message: "User Created", authToken });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error!" });
  }
});

// ROUTE-2: Login Admin Using POST "/api/adminauth/login" no loin required
router.post("/login", async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      success = false;
      return res.status(404).json({
        success,
        error: "please try to login with correct credentials",
      });
    }
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      success = false;
      return res.status(404).json({
        success,
        error: "please try to login with correct credentials",
      });
    }
    // create an data var for user id to send jsonwebtoken to an user
    const data = {
      admin: {
        id: admin.id,
      },
    };

    // if user is not avaiable
    if (!admin) {
      success = false;
      return res.status(404).json({ message: "Invalid Details", success });
    }

    // send user jwt token if he signup or create an account.
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    res.status(200).json({
      authToken,
      message: "You have SuccessFully Login",
      success,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error!" });
  }
});

// ROUTE:3 Get Admin Details Using GET "/api/adminauth/getadmin" login required
router.post("/getadmin", fetchadmin, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    res.send(admin);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error!" });
  }
});

module.exports = router;
