const express = require("express");
const Movie = require("../models/Movie.js");

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movies"
    });
  }
});

// Get one movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

// Add movie
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create movie",
      error: error.message
    });
  }
});

// Delete movie
router.delete("/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    res.json({
      message: "Movie deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete movie"
    });
  }
});

module.exports = router;