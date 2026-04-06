const seatService = require("./seat.service");

// ✅ GET Seats
const getSeats = async (req, res) => {
  try {
    const  { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const seats = await seatService.getSeatsByEvent(eventId);

    res.status(200).json({
      success: true,
      data: seats,
    });
  } catch (error) {
    console.error("Get Seats Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching seats",
    });
  }
};


// 🔒 LOCK Seats
const lockSeats = async (req, res) => {
  try {
    const { eventId, seatIds, userId } = req.body;

    if (!eventId || !seatIds || !userId) {
      return res.status(400).json({
        success: false,
        message: "eventId, seatIds and userId required",
      });
    }

    const result = await seatService.lockSeats(eventId, seatIds, userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Lock Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// 🔓 RELEASE Seats
const releaseSeats = async (req, res) => {
  try {
    const { eventId, seatIds } = req.body;

    if (!eventId || !seatIds) {
      return res.status(400).json({
        success: false,
        message: "eventId and seatIds required",
      });
    }

    const result = await seatService.releaseSeats(eventId, seatIds);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Release Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ CONFIRM BOOKING
const confirmBooking = async (req, res) => {
  try {
    const { eventId, seatIds, userId } = req.body;

    if (!eventId || !seatIds || !userId) {
      return res.status(400).json({
        success: false,
        message: "eventId, seatIds and userId required",
      });
    }

    const result = await seatService.confirmBooking(
      eventId,
      seatIds,
      userId
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Confirm Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getSeats,
  lockSeats,
  releaseSeats,
  confirmBooking,
};