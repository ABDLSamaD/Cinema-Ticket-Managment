const express = require("express");
const router = express.Router();
const Seat = require("../models/Seat");

// route for add seatmap seats
router.post("/addseat", async (req, res) => {
  let success;
  try {
    const { seatName, seatImg, price, selected, occupied } = req.body;
    const seats = new Seat({
      seatName,
      seatImg,
      price,
      selected,
      occupied,
    });
    const result = await seats.save();
    success = true;
    res.json({ success, result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/update", async (req, res) => {
  const { seatName, seatSelect } = req.body;
  try {
    await Seat.updateOne({ seatName }, { seatSelect });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// route for find seatmap
router.get("/seatmap", async (req, res) => {
  try {
    const seat = await Seat.find();
    res.json(seat);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
