const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: Date,
  type: {
    type: String,
    enum: ["MOVIE", "CONCERT"],
    required: true
  },
  hasSeats: {
    type: Boolean,
    default: true
  },

  // for concerts
  categories: [
    {
      name: String,
      price: Number,
      tag: String // "Fast Filling"
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);