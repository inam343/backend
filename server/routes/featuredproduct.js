const express = require("express");
const router = express.Router();
const featuredproduct = require("../models/featuredproduct");

// Get all products
router.get("/", async (req, res) => {
  try {
    const featuredProduct = await featuredproduct.find();
    res.json(featuredProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;