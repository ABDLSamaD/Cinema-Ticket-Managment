const mongoose = require("mongoose");

const adminScheema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String, unique: true },
  password: { type: String },
  verified: Boolean,
  isAdmin: { type: Boolean, default: false }, //just in case we need
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("adminauth", adminScheema);
