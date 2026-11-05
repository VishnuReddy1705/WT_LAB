import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Preset Bike Models with realistic Unsplash high-resolution motorcycle photos
const PRESET_BIKES = [
  {
    name: "Royal Enfield Classic 350",
    type: "Cruiser",
    rate: 150,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Yamaha YZF R15 V4",
    type: "Sports",
    rate: 200,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "KTM Duke 390",
    type: "Street Naked",
    rate: 250,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Honda Activa 6G",
    type: "Scooter",
    rate: 80,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Harley-Davidson Iron 883",
    type: "Custom Cruiser",
    rate: 450,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80"
  }
];

function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    bookingId: "BK" + Math.floor(1000 + Math.random() * 9000),
    customerName: "",
    bikeModel: PRESET_BIKES[0].name,
    bikeType: PRESET_BIKES[0].type,
    bookingDate: new Date().toISOString().split("T")[0],
    rentalHours: 3,
    totalPrice: PRESET_BIKES[0].rate * 3,
    imageUrl: PRESET_BIKES[0].image,
    status: "Confirmed"
  });

  const [editId, setEditId] = useState(null);
  const API = "http://localhost:5000/bookings";

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(API);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // When user clicks a preset bike card
  const handleSelectBikePreset = (bike) => {
    const hours = Number(formData.rentalHours) || 1;
    setFormData({
      ...formData,
      bikeModel: bike.name,
      bikeType: bike.type,
      imageUrl: bike.image,
      totalPrice: bike.rate * hours
    });
  };

  // Form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    // Auto-update price when rental hours change
    if (name === "rentalHours") {
      const hours = Number(value) || 0;
      const matched = PRESET_BIKES.find((b) => b.name === formData.bikeModel);
      const rate = matched ? matched.rate : 100;
      updated.totalPrice = rate * hours;
    }

    setFormData(updated);
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        rentalHours: Number(formData.rentalHours),
        totalPrice: Number(formData.totalPrice)
      };

      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(API, payload);
      }

      // Reset form
      setFormData({
        bookingId: "BK" + Math.floor(1000 + Math.random() * 9000),
        customerName: "",
        bikeModel: PRESET_BIKES[0].name,
        bikeType: PRESET_BIKES[0].type,
        bookingDate: new Date().toISOString().split("T")[0],
        rentalHours: 3,
        totalPrice: PRESET_BIKES[0].rate * 3,
        imageUrl: PRESET_BIKES[0].image,
        status: "Confirmed"
      });

      await fetchBookings();
      alert("Booking saved successfully!");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert(error.response?.data?.message || "Could not save booking. Check backend.");
    }
  };

  // Edit
  const handleEdit = (item) => {
    setFormData({
      bookingId: item.bookingId,
      customerName: item.customerName,
      bikeModel: item.bikeModel,
      bikeType: item.bikeType,
      bookingDate: item.bookingDate,
      rentalHours: item.rentalHours,
      totalPrice: item.totalPrice,
      imageUrl: item.imageUrl,
      status: item.status || "Confirmed"
    });
    setEditId(item._id);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel and delete this booking?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      await fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Could not delete booking. Check backend.");
    }
  };

  // Cancel Edit
  const cancelEdit = () => {
    setEditId(null);
    setFormData({
      bookingId: "BK" + Math.floor(1000 + Math.random() * 9000),
      customerName: "",
      bikeModel: PRESET_BIKES[0].name,
      bikeType: PRESET_BIKES[0].type,
      bookingDate: new Date().toISOString().split("T")[0],
      rentalHours: 3,
      totalPrice: PRESET_BIKES[0].rate * 3,
      imageUrl: PRESET_BIKES[0].image,
      status: "Confirmed"
    });
  };

  return (
    <div className="container">
      {/* Title Header */}
      <header className="header">
        <h1>🏍️ Bike Booking Management System</h1>
        <p>Full Stack CRUD Web Application with ReactJS, NodeJS, Express & MongoDB</p>
      </header>

      {/* Preset Bikes Photo Gallery */}
      <section className="fleet-section">
        <div className="section-header">
          <h3>📸 Select from Available Fleet:</h3>
          <span className="hint">Click any bike to autofill details & photo</span>
        </div>
        <div className="fleet-grid">
          {PRESET_BIKES.map((bike) => (
            <div
              key={bike.name}
              className={`bike-card ${formData.bikeModel === bike.name ? "active-card" : ""}`}
              onClick={() => handleSelectBikePreset(bike)}
            >
              <img src={bike.image} alt={bike.name} className="bike-photo" />
              <div className="bike-info">
                <h4>{bike.name}</h4>
                <div className="badge-row">
                  <span className="type-tag">{bike.type}</span>
                  <span className="rate-tag">₹{bike.rate} / hr</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Card */}
      <div className="form-wrapper">
        <h2>{editId ? "✏️ Edit Booking Record" : "➕ Book a Ride"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label>Booking ID</label>
              <input
                type="text"
                name="bookingId"
                value={formData.bookingId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="e.g. Tony Stark"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Bike Model</label>
              <input
                type="text"
                name="bikeModel"
                value={formData.bikeModel}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Bike Category</label>
              <select name="bikeType" value={formData.bikeType} onChange={handleChange}>
                <option value="Cruiser">Cruiser</option>
                <option value="Sports">Sports</option>
                <option value="Street Naked">Street Naked</option>
                <option value="Scooter">Scooter</option>
                <option value="Custom Cruiser">Custom Cruiser</option>
              </select>
            </div>

            <div className="field">
              <label>Booking Date</label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Rental Duration (Hours)</label>
              <input
                type="number"
                name="rentalHours"
                min="1"
                max="72"
                value={formData.rentalHours}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Total Price (₹)</label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Booking Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="field full-width">
            <label>Bike Photo URL</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://..."
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Real-time photo preview */}
          {formData.imageUrl && (
            <div className="preview-box">
              <span className="preview-label">Selected Bike Preview:</span>
              <img src={formData.imageUrl} alt="Selected Bike" className="preview-image" />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editId ? "Update Booking" : "Confirm Booking"}
            </button>
            {editId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <section className="table-section">
        <h2>📋 All Bookings & Rentals</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Bike Model</th>
                <th>Type</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Total (₹)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img src={b.imageUrl} alt={b.bikeModel} className="thumbnail" />
                  </td>
                  <td className="booking-code">{b.bookingId}</td>
                  <td className="bold">{b.customerName}</td>
                  <td>{b.bikeModel}</td>
                  <td><span className="type-pill">{b.bikeType}</span></td>
                  <td>{b.bookingDate}</td>
                  <td>{b.rentalHours} hrs</td>
                  <td className="price-tag">₹{b.totalPrice}</td>
                  <td>
                    <span className={`status-pill status-${(b.status || "confirmed").toLowerCase().replace(" ", "-")}`}>
                      {b.status || "Confirmed"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => handleEdit(b)}>
                        Edit
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(b._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="10" className="empty-message">
                    No bike bookings recorded yet. Choose a bike above and create your first booking!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
