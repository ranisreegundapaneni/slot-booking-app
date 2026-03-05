import React, { useEffect, useState } from "react";
import { getSlots, bookSlot } from "./api";

function App() {

  const [slots, setSlots] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    const data = await getSlots();
    setSlots(data);
  };

  const handleBook = async (id) => {

    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    try {
      await bookSlot(id, name);
      setName("");
      loadSlots();
    } catch (err) {
      console.log("Booking failed");
    }
  };

  const availableSlots = slots.filter(slot => !slot.booked);
  const bookedSlots = slots.filter(slot => slot.booked);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Slot Booking App</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>Available Slots</h2>

      {availableSlots.map((slot) => (
        <div key={slot.id} style={{ marginBottom: "8px" }}>
          <strong>{slot.time}</strong> -
          <span style={{ color: "green", marginLeft: "5px" }}>
            Available
          </span>

          <button
            onClick={() => handleBook(slot.id)}
            style={{ marginLeft: "10px" }}
          >
            Book
          </button>
        </div>
      ))}

      <h2>Booked Slots</h2>

      {bookedSlots.length === 0 && (
        <p>No slots booked yet</p>
      )}

      {bookedSlots.map((slot) => (
        <div key={slot.id} style={{ marginBottom: "8px" }}>
          <strong>{slot.time}</strong> -
          <span style={{ color: "red", marginLeft: "5px" }}>
            Booked by {slot.bookedBy}
          </span>
        </div>
      ))}

    </div>
  );
}

export default App;