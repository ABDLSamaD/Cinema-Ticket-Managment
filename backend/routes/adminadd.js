const express = require("express");
const addmovies = require("../models/addmovies");
const mongoose = require("mongoose");
const little = require("../models/little");
const router = express.Router();

// Middleware to check if occupied seats need to be removed
const removeOccupiedSeatsIfNeeded = async (movie) => {
  try {
    const currentTimestamp = Date.now();
    const oneHourInMilliseconds = 10800000;

    // Check if the last update was more than an hour ago
    if (currentTimestamp - movie.lastUpdated > oneHourInMilliseconds) {
      // Clear the occupied seats if the last update was more than an hour ago
      movie.occupiedSeats = [];
      await movie.save();
      console.log(
        "Occupied seats have been removed for movie:",
        movie.movietitle
      );
    }
  } catch (error) {
    console.error("Error removing occupied seats:", error);
  }
};

// Middleware to check if it's too late to book seats for the movie
const checkBookingTime = (currentMovie) => {
  try {
    const currentTimestamp = Date.now();

    // Define valid show timings
    const validDays = ["Monday", "Tuesday"];
    const validTimings = ["14:00:00", "18:00:00"]; // Assuming 24-hour format

    // Check if the movie day and time are valid
    if (
      validDays.includes(currentMovie.day) &&
      validTimings.includes(currentMovie.time)
    ) {
      // Combine the day and time to get the full start time string
      const fullStartTime = `${currentMovie.day} ${currentMovie.time}`;

      // Check if the movie time has started
      if (currentTimestamp >= new Date(fullStartTime).getTime()) {
        return false; // Movie time has started. Cannot book seats for this show.
      }
    }
    return true; // Booking allowed
  } catch (error) {
    console.error("Error checking booking time:", error);
    return false; // Assume booking is not allowed in case of an error
  }
};

// Middleware to check if all seats are booked
const checkAllSeatsBooked = (currentMovie) => {
  try {
    const totalSeats = currentMovie.totalSeats;
    const occupiedSeats = currentMovie.occupiedSeats.length;

    if (occupiedSeats >= totalSeats) {
      return true; // All seats are booked
    }

    return false; // Seats available
  } catch (error) {
    console.error("Error checking if all seats are booked:", error);
    return false; // Assume not all seats are booked in case of an error
  }
};

// ROUTE-1: Fetch all Movies by Admin using on /api/adminamovie/fetchmovie login required
router.get("/fetchmovie", async (req, res) => {
  try {
    const movie = await addmovies.find();
    res.send(movie);

    // Remove occupied seats logic
    await removeOccupiedSeatsIfNeeded(movie);
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ error: "Internal Server Error!" });
  }
});

// ROUTE-2: Add Movies by Admin using POST on /api/adminamovie/addmovie login required
router.post("/addmovie", async (req, res) => {
  // success if ture is anywhere
  let success = false;
  try {
    // object destructing of adding movie
    const {
      movietitle,
      ratings,
      releasedate,
      director,
      image,
      moviedescription,
      duration,
      rated,
      movietrailer,
      price,
      occupiedSeats,
    } = req.body;

    const movie = new addmovies({
      movietitle,
      ratings,
      releasedate,
      director,
      image,
      moviedescription,
      duration,
      rated,
      movietrailer,
      price,
      occupiedSeats: occupiedSeats || [],
      // user: req.user.id,
    });

    const movies = await movie.save();

    if (!movies) {
      success = false;
      return res.json({ success, message: "Not Found!" });
    }

    // Remove occupied seats logic
    await removeOccupiedSeatsIfNeeded(movie);

    success = true;
    res.status(200).json({ success, message: "Movies data Created.", movies });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: "Internal Server Error!" });
  }
});

// update the movies occupied list by user "/api/adminamovie/updateoccupiedseats/:movieId" login required
router.put("/updateoccupiedseats/:movieId", async (req, res) => {
  try {
    const movieid = req.params.movieId;
    const { selectedSeats } = req.body;

    // Fetch the current movie data including version number
    const currentMovie = await addmovies.findById(movieid);
    if (!currentMovie) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found!" });
    }

    // Update the movie with the new occupied seats
    const updatedMovie = await addmovies.findOneAndUpdate(
      { _id: movieid },
      {
        $set: {
          occupiedSeats: selectedSeats,
          version: currentMovie.version,
        },
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(500).json({ message: "Failed to update movie seats" });
    }

    res.status(200).json({
      success: true,
      message: "Occupied seats updated.",
      movie: updatedMovie,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal Server Error!" });
  }
});

// route of time
// router.get("/:day/:time", async (req, res) => {
//   try {
//     const { day, time } = req.params;
//     const movies = await addmovies.find({ day, time });
//     res.json(movies);
//   } catch (error) {
//     console.error("Error fetching movies by day and time:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;

/* 
router.get("/littleapi", async (req, res) => {
  try {
    const { version } = req.body;
    const user = await little.create({ version });
    if (user) {
      return res.send(user);
    }
    res.send("not send");
  } catch (error) {
    console.error(error.message);
  }
});
 */
