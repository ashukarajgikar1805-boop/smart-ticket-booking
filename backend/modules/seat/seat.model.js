const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },

    seatNumber: {
      type: String,
      required: true,
    },

    row: {
      type: String,
      required: true,
    },

    // 🔥 NEW: seat type for BookMyShow layout
    type: {
      type: String,
      enum: ["RECLINER", "PRIME_PLUS", "PRIME", "CLASSIC_PLUS", "CLASSIC"],
      default: "CLASSIC",
    },

    price: {
      type: Number,
      default: 0,
    },

    // ✅ FIXED: match seed values (case sensitive)
    category: {
      type: String,
      enum: ["VIP", "Regular", "Premium"],
      default: "Regular",
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "LOCKED", "BOOKED"],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seat", seatSchema);