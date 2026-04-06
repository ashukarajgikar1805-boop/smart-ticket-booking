const express = require("express");
const router = express.Router();

const seatController = require("./seat.controller");

// GET seats
router.get("/:eventId", seatController.getSeats);

// LOCK
router.post("/lock", seatController.lockSeats);

// RELEASE
router.post("/release", seatController.releaseSeats);

// CONFIRM BOOKING
router.post("/confirm", seatController.confirmBooking);

module.exports = router;