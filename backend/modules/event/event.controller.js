const Event = require("./event.model");

// ✅ CREATE EVENT
const createEvent = async (req, res) => {
  try {
    const { name, location, date, type, hasSeats, categories } = req.body;

    // Basic validation
    if (!name || !location || !date || !type) {
      return res.status(400).json({
        success: false,
        message: "name, location, date and type are required",
      });
    }

    const event = new Event({
      name,
      location,
      date,
      type,
      hasSeats,
      categories,
    });

    const savedEvent = await event.save();

    res.status(201).json({
      success: true,
      data: savedEvent,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

// ✅ GET ALL EVENTS
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// ✅ GET SINGLE EVENT
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get Event Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
    });
  }
};

module.exports = {
  createEvent,   // 🔥 IMPORTANT
  getEvents,
  getEventById,
};