const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: Number,
    brand: String,
    name: String,
    image: String,
    price: Number,
    oldPrice: Number,
    rating: Number,
  },
  {
    collection: "breakfast"
  }
);

module.exports = mongoose.model("breakfast", productSchema);