const express = require("express");
const router = express.Router();
const validator = require("validator");
const contactMail = require("../mail/contactmail");
const ContactMailModel = require("../models/contactmodel");

// route for contact using POST: /api/form/contact
router.post("/contact", async (req, res) => {
  let success;
  try {
    const { names, email, message } = req.body;

    //   validator name
    if (!validator.isAlpha(names)) {
      success = false;
      return res.status(400).send({ success, messages: "Invalid name" });
    }

    //   validator email
    if (!validator.isEmail(email)) {
      success = false;
      return res
        .status(400)
        .send({ success, messages: "Invalid email address" });
    }

    //   validator message
    if (!validator.isLength(message, { min: 10 })) {
      success = false;
      return res.status(400).send({
        success,
        messages: "Message should be at least 10 characters long",
      });
    }

    const contact = new ContactMailModel({
      names,
      email,
      message,
    });
    const response = await contact.save();
    if (response) {
      contactMail(names, email);
      success = true;
      return res
        .status(200)
        .send({ success, messages: "your feedback has been submitted" });
    }
    success = false;
    return res.status(400).json({ success, messages: "Invalid Feedback" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
