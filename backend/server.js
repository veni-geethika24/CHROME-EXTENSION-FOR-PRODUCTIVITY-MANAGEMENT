const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Route
const Track = require("./models/Track");

app.post("/track", async (req, res) => {
  const { site, time } = req.body;
  const log = new Track({ site, time, date: new Date() });
  await log.save();
  res.json({ message: "Data saved" });
});

app.get("/report", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const data = await Track.find({
    date: { $gte: new Date(today) }
  });
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
