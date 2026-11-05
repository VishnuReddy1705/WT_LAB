# 🏍️ Bike Booking Management System (MERN Stack)

## Project Location
`C:\Users\omvis\.gemini\antigravity\scratch\bike-booking-management`

---

## Quick Start (Run the Application)

### 1. Start the Backend Server (Terminal 1)
```bash
cd backend
node server.js
```
- **Port:** `http://localhost:5000`
- **MongoDB Database:** `bikebookingdb`

---

### 2. Start the React Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
- **Local URL:** `http://localhost:5173/`

---

## Features
- **Fleet Selection Gallery:** 5 high-resolution bike photo presets (Royal Enfield, Yamaha R15, KTM Duke, Activa, Harley Davidson).
- **Interactive Form:** Select a bike to autofill details and photo preview, or enter custom URLs.
- **CRUD Operations:**
  - **Create:** Book a ride with hours, price, and photo preview.
  - **Read:** Display all active bookings in a styled table with photo thumbnails and status pills.
  - **Update:** Edit any booking details in-place.
  - **Delete:** Cancel/delete bookings with instant state refresh.
- **MongoDB Verification:** Open MongoDB Compass and explore database `bikebookingdb` -> collection `bookings`.
