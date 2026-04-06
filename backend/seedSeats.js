require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Seat = require("./modules/seat/seat.model");

// 🎯 ✅ PASTE REAL EVENT ID HERE (VERY IMPORTANT)
const eventId = new mongoose.Types.ObjectId("69cf71ee060b5cb380f8d197");

// 🎬 Seat Layout Config (BookMyShow Style)
const rowsConfig = [
  { row: "A", type: "RECLINER", price: 700 },
  { row: "B", type: "PRIME_PLUS", price: 500 },
  { row: "C", type: "PRIME", price: 460 },
  { row: "D", type: "CLASSIC_PLUS", price: 380 },
  { row: "E", type: "CLASSIC", price: 360 },
];

const generateSeats = () => {
  const seats = [];

  rowsConfig.forEach(({ row, type, price }) => {
    for (let i = 1; i <= 20; i++) {
      seats.push({
        eventId,
        seatNumber: `${row}${i}`,
        row,
        type, // 🔥 used for UI grouping
        price,
        category: type === "RECLINER" ? "VIP" : "Regular",
        status: "AVAILABLE",
      });
    }
  });

  return seats;
};

const seedSeats = async () => {
  try {
    await connectDB();

    // ✅ Delete only seats of this event
    await Seat.deleteMany({ eventId });

    const seats = generateSeats();

    await Seat.insertMany(seats);

    console.log("✅ Movie seats inserted successfully");
    console.log("🎯 EventId used:", eventId.toString());

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedSeats();