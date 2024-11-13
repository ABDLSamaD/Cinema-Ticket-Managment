const mongoose = require("mongoose");

const contactMailSchema = new mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ContactMailModel = mongoose.model("ContactMail", contactMailSchema);

module.exports = ContactMailModel;
