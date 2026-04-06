const Seat = require("./seat.model");
const redisClient = require("../../config/redis");

// ✅ Get seats (with LOCK visibility)
const getSeatsByEvent = async (eventId) => {
  const seats = await Seat.find({ eventId }).lean();

  for (let seat of seats) {
    const key = `seat_lock:${eventId}:${seat.seatNumber}`;
    const locked = await redisClient.get(key);

    if (locked) {
      seat.status = "LOCKED";
      seat.lockedBy = locked;
    }
  }

  return seats;
};


// 🔒 Lock seats
const lockSeats = async (eventId, seatIds, userId) => {
  const lockTime = 300; // 5 minutes

  for (let seatId of seatIds) {
    const key = `seat_lock:${eventId}:${seatId}`;

    const existing = await redisClient.get(key);

    if (existing) {
      throw new Error(`Seat ${seatId} already locked`);
    }
  }

  // Lock all seats
  for (let seatId of seatIds) {
    const key = `seat_lock:${eventId}:${seatId}`;

    await redisClient.set(key, userId, {
      EX: lockTime,
    });
  }

  return { message: "Seats locked successfully" };
};


// 🔓 Release seats
const releaseSeats = async (eventId, seatIds) => {
  for (let seatId of seatIds) {
    const key = `seat_lock:${eventId}:${seatId}`;
    await redisClient.del(key);
  }

  return { message: "Seats released" };
};


// ✅ Confirm booking (FINAL STEP)
const confirmBooking = async (eventId, seatIds, userId) => {
  // Step 1: Validate locks
  for (let seatId of seatIds) {
    const key = `seat_lock:${eventId}:${seatId}`;
    const lockedBy = await redisClient.get(key);

    if (!lockedBy || lockedBy !== userId) {
      throw new Error(`Seat ${seatId} is not locked by you`);
    }
  }

  // Step 2: Mark seats as BOOKED
  await Seat.updateMany(
    { eventId, seatNumber: { $in: seatIds } },
    { status: "BOOKED" }
  );

  // Step 3: Remove locks
  for (let seatId of seatIds) {
    const key = `seat_lock:${eventId}:${seatId}`;
    await redisClient.del(key);
  }

  return { message: "Booking confirmed" };
};


module.exports = {
  getSeatsByEvent,
  lockSeats,
  releaseSeats,
  confirmBooking,
};