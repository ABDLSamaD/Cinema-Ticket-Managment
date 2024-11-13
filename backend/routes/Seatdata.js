const express = require("express");
const router = express.Router();
const SeatData = require("../models/seatData");
const fetchuser = require("../middleware/fetchuser");

// Define API endpoint to receive data from the frontend
router.post("/cinema-data", fetchuser, async (req, res) => {
  let success;
  try {
    const { seatsName, selectedMovie, selectedSeats, moviePrice, randomId } =
      req.body;
    const seat = new SeatData({
      selectedSeats,
      seatsName,
      selectedMovie,
      moviePrice,
      randomId,
      user: req.user.id,
    });
    // send user jwt token if he signup or create an account.
    const data = await seat.save();
    success = true;
    res.json({ data, success, message: "Seat Details Addeed Success.." });
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
});
// ROUTE 1: Fetch an users of only seat details using an get "/api/seat-details" login required
router.get("/seat-details", fetchuser, async (req, res) => {
  try {
    const seat = await SeatData.find({ user: req.user.id });
    res.send(seat);
  } catch (error) {
    res.status(500).send("Internal server error!");
    console.error(error.message);
  }
});

module.exports = router;
