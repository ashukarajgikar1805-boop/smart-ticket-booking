import React from "react";

const EventSelector = ({ events, selectedEventId, setSelectedEventId }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <select
        value={selectedEventId}
        onChange={(e) => setSelectedEventId(e.target.value)}
        style={{
          padding: 10,
          borderRadius: 5,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name} ({event.type})
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventSelector;