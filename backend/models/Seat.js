const mongoose = require("mongoose");

// Create a Seat schema
const seatSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddMovies", // Reference to the AddMovies schema
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  seatName: String,
  seatImg: String,
  price: Number,
  selected: Boolean,
  occupied: Boolean,
});

module.exports = mongoose.model("Seat", seatSchema);
