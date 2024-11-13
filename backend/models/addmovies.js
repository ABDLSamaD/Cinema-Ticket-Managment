const mongoose = require("mongoose");

const addmovieScheema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  movietitle: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
  },
  releasedate: {
    type: String,
  },
  director: {
    type: String,
  },
  image: {
    type: String,
  },
  moviedescription: {
    type: String,
  },
  duration: {
    type: String,
  },
  rated: {
    type: String,
  },
  movietrailer: {
    type: String,
  },
  price: {
    type: String,
  },
  startTime: String,
  occupiedSeats: [{ type: String }],
  version: { type: Number, default: 0 },
  day: String,
  time: String,
  lastUpdated: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("addmovie", addmovieScheema);
