import React, { useState } from "react";

const ConcertBooking = ({ event }) => {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (cat) => {
    if (selected.includes(cat.name)) {
      setSelected(selected.filter((c) => c !== cat.name));
    } else {
      setSelected([...selected, cat.name]);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>🎤 {event.name}</h2>
      <p>{event.location}</p>

      {event.categories?.map((cat, i) => (
        <div
          key={i}
          onClick={() => toggleCategory(cat)}
          style={{
            margin: 12,
            padding: 15,
            borderRadius: 10,
            cursor: "pointer",
            border: "1px solid #ddd",
            background: selected.includes(cat.name) ? "#2196F3" : "#fff",
            color: selected.includes(cat.name) ? "#fff" : "#000",
          }}
        >
          <h3>{cat.name} - ₹{cat.price}</h3>
          {cat.tag && <span style={{ color: "red" }}>{cat.tag}</span>}
        </div>
      ))}

      <h3>Selected: {selected.join(", ") || "None"}</h3>
    </div>
  );
};

export default ConcertBooking;ConcertBooking