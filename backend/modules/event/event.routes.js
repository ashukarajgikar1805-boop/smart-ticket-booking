const express = require("express");
const router = express.Router();

const {
  createEvent,   // 🔥 ADD THIS
  getEvents,
  getEventById,
} = require("./event.controller");

// ✅ CREATE EVENT (POST)
router.post("/", createEvent);

// ✅ GET ALL EVENTS
router.get("/", getEvents);

// ✅ GET EVENT BY ID
router.get("/:id", getEventById);

module.exports = router;