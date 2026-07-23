const express = require("express");
const breakfastitem = require("../models/breakfast");
const router = express.Router();


// Get all products
router.get("/", async (req, res) => {
  try {
    const breakfastitems = await breakfastitem.find();
    res.json(breakfastitems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;