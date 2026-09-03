const express = require("express");

const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "This is a protected profile",
    user: req.user
  });
});

module.exports = router;