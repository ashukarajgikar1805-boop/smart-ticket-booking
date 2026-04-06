const express = require("express");
const cors = require("cors");

// Routes
const seatRoutes = require("./modules/seat/seat.routes");
const eventRoutes = require("./modules/event/event.routes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("🚀 Ticket Booking API is running...");
});

// ✅ API Routes
app.use("/api/seats", seatRoutes);
app.use("/api/events", eventRoutes);

// ❌ 404 - Route Not Found (must be AFTER routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ❌ Global Error Handler (IMPORTANT: 4 params required)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);

  // Prevent headers already sent error
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;