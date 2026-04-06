import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import ConcertBooking from "./ConcertBooking";
import EventSelector from "./EventSelector";
import {
  getSeats,
  lockSeats,
  confirmBooking,
  getEventById,
  getEvents,
} from "../services/api";

const SeatGrid = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const userId = "user123";

  // ✅ Load all events
  const loadEvents = async () => {
    const res = await getEvents();
    setEvents(res.data.data);

    if (res.data.data.length > 0) {
      setSelectedEventId(res.data.data[0]._id);
    }
  };

  // ✅ Load selected event
  const loadEvent = async (id) => {
    const res = await getEventById(id);
    setEvent(res.data.data);
  };

  // ✅ Load seats
  const loadSeats = async (id) => {
    const res = await getSeats(id);
    setSeats(res.data.data || []);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      loadEvent(selectedEventId);
      loadSeats(selectedEventId);
      setSelectedSeats([]);
    }
  }, [selectedEventId]);

  if (!event) return <h2>Loading...</h2>;

  // 🎤 CONCERT VIEW
  if (event.type === "CONCERT") {
    return (
      <div style={{ textAlign: "center" }}>
        <EventSelector
          events={events}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
        />
        <ConcertBooking event={event} />
      </div>
    );
  }

  // 🎬 MOVIE VIEW

  const groupedSeats = seats.reduce((acc, seat) => {
    const row = seat.row;
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  const handleSeatClick = (seat) => {
    if (seat.status !== "AVAILABLE") return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const handleLock = async () => {
    await lockSeats({
      eventId: selectedEventId,
      seatIds: selectedSeats,
      userId,
    });
    setSelectedSeats([]);
    loadSeats(selectedEventId);
  };

  const handleConfirm = async () => {
    await confirmBooking({
      eventId: selectedEventId,
      seatIds: selectedSeats,
      userId,
    });
    setSelectedSeats([]);
    loadSeats(selectedEventId);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      {/* 🔥 Event Selector */}
      <EventSelector
        events={events}
        selectedEventId={selectedEventId}
        setSelectedEventId={setSelectedEventId}
      />

      <h2>{event.name}</h2>
      <p>{event.location}</p>

      {/* Screen */}
      <div style={{ margin: "20px 0", fontWeight: "bold" }}>
        🎬 SCREEN THIS WAY
      </div>

      {/* Seats */}
      <div>
        {Object.keys(groupedSeats).map((row) => (
          <div key={row} style={{ display: "flex", justifyContent: "center" }}>
            <b style={{ width: 30 }}>{row}</b>

            {groupedSeats[row].map((seat) => (
              <Seat
                key={seat._id}
                seat={seat}
                onClick={handleSeatClick}
                isSelected={selectedSeats.includes(seat.seatNumber)}
              />
            ))}
          </div>
        ))}
      </div>

      <h3>Selected: {selectedSeats.join(", ") || "None"}</h3>

      <button onClick={handleLock}>Lock Seats</button>
      <button onClick={handleConfirm}>Confirm Booking</button>
    </div>
  );
};

export default SeatGrid;