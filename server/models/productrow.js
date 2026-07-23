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
    collection: "productrow"
  }
);

module.exports = mongoose.model("Productrow", productSchema);