const mongoose = require("mongoose");

const seatSecheema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  selectedSeats: {
    type: Number,
  },
  seatsName: {
    type: [String],
  },
  selectedMovie: {
    type: String,
  },
  moviePirce: {
    type: Number,
  },
  randomId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("seatdata", seatSecheema);
