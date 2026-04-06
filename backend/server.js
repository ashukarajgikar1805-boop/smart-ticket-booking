require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// 🚀 Start Server
const startServer = async () => {
  try {
    // ✅ Connect Database
    await connectDB();
    console.log("✅ MongoDB Connected");

    // ✅ Start Express Server
    app.listen(PORT, () => {
      console.log("====================================");
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
      console.log(`📌 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🎯 Seats API: http://localhost:${PORT}/api/seats/:eventId`);
      console.log(`🎤 Events API: http://localhost:${PORT}/api/events`);
      console.log("====================================");
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();