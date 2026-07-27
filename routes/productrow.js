const express = require("express");
const router = express.Router();
const Productrow = require("../models/productrow");

// Get all products
router.get("/", async (req, res) => {
  try {
    const productrow = await Productrow.find();
    res.json(productrow);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;