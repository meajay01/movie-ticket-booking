const express = require("express");

const Booking = require("../models/Booking.js");
const Movie = require("../models/Movie.js");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

// Create Booking
router.post("/", protect, async (req, res) => {
  try {
    const {
      movie,
      seats,
      showDate,
      showTime
    } = req.body;

    // Check required fields
    if (!movie || !seats || !showDate || !showTime) {
      return res.status(400).json({
        message: "Please provide movie, seats, show date and show time"
      });
    }

    // Check seats
    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        message: "Please select at least one seat"
      });
    }

    // Check movie exists
    const movieExists = await Movie.findById(movie);

    if (!movieExists) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    // Check whether selected seats are already booked
    const existingBookings = await Booking.find({
      movie,
      showDate,
      showTime,
      status: "confirmed"
    });

    const bookedSeats = existingBookings.flatMap(
      booking => booking.seats
    );

    const alreadyBooked = seats.filter(
      seat => bookedSeats.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: "Some seats are already booked",
        seats: alreadyBooked
      });
    }

    // Ticket price
    const pricePerSeat = 200;

    const totalAmount = seats.length * pricePerSeat;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      movie,
      seats,
      showDate,
      showTime,
      totalAmount
    });

    // Return booking with movie and user details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("movie", "title genre duration language poster")
      .populate("user", "name email");

    res.status(201).json({
      message: "Ticket booked successfully",
      booking: populatedBooking
    });

  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message
    });
  }
});


// Get logged-in user's bookings
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    })
      .populate("movie", "title genre duration language poster")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});


module.exports = router;