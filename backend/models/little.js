const mongoose = require("mongoose");

const littleScheema = new mongoose.Schema({
  version: { type: Number, default: 0 },
});

module.exports = mongoose.model("little", littleScheema);
