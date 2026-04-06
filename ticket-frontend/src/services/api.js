import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🎬 Seats
export const getSeats = (eventId) =>
  API.get(`/seats/${eventId}`);

export const lockSeats = (data) =>
  API.post("/seats/lock", data);

export const confirmBooking = (data) =>
  API.post("/seats/confirm", data);

// 🎤 Events
export const getEvents = () =>
  API.get("/events");

export const getEventById = (id) =>
  API.get(`/events/${id}`);