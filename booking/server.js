const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let slots = [
  { id: 1, time: "10:00 AM", booked: false, bookedBy: "" },
  { id: 2, time: "11:00 AM", booked: false, bookedBy: "" },
  { id: 3, time: "12:00 PM", booked: false, bookedBy: "" },
  { id: 4, time: "01:00 PM", booked: false, bookedBy: "" }
];

app.get("/slots", (req, res) => {
  res.json(slots);
});

app.post("/book", (req, res) => {
  const { id, name } = req.body;

  const slot = slots.find(s => s.id === id);

  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  if (slot.booked) {
    return res.status(400).json({ message: "Slot already booked" });
  }

  slot.booked = true;
  slot.bookedBy = name;

  res.json({ message: "Slot booked successfully" });
});
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});