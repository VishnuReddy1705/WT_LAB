const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/bikebookingdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// Bike Booking Schema
const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  customerName: { type: String, required: true },
  bikeModel: { type: String, required: true },
  bikeType: { type: String, required: true }, // e.g. Cruiser, Sports, Commuter, Scooter
  bookingDate: { type: String, required: true },
  rentalHours: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, default: "Confirmed" }
});

const Booking = mongoose.model("Booking", bookingSchema);

// Base route
app.get("/", (req, res) => {
  res.send("Bike Booking Management API is running");
});

// CREATE: Add new booking
app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ: Get booking by ID
app.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: Update booking by ID
app.put("/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete booking by ID
app.delete("/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server Listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
