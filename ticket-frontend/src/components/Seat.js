import React from "react";

const Seat = ({ seat, onClick, isSelected }) => {
  let bgColor = "#ccc";

  if (seat.status === "AVAILABLE") bgColor = "#4CAF50"; // green
  if (seat.category === "VIP") bgColor = "#9C27B0"; // purple VIP
  if (seat.status === "LOCKED") bgColor = "#FF9800"; // orange
  if (seat.status === "BOOKED") bgColor = "#F44336"; // red
  if (isSelected) bgColor = "#2196F3"; // blue

  return (
    <div
      onClick={() => onClick(seat)}
      style={{
        width: 42,
        height: 42,
        margin: 6,
        borderRadius: 8,
        backgroundColor: bgColor,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: "bold",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      {seat.seatNumber}
    </div>
  );
};

export default Seat; 