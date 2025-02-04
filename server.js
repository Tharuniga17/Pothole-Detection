const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for road hazards (potholes and speed breakers)
const roadHazards = [
  { latitude: 11.1, longitude: 78.1, description: "Example pothole", type: "pothole", severity: "high" },
  { latitude: 11.2, longitude: 78.2, description: "Another pothole", type: "pothole", severity: "medium" },
  { latitude: 11.9, longitude: 78.9, description: "Speed breaker example", type: "speed_breaker", severity: "low" }
];

// GET endpoint to retrieve all road hazards (potholes and speed breakers)
app.get('/road_hazards.json', (req, res) => {
  console.log("Fetching all road hazards...");
  res.json(roadHazards);
});

// POST endpoint to add a new road hazard (pothole or speed breaker)
app.post('/potholes', (req, res) => {
  const { latitude, longitude, description, type, severity, cartype } = req.body;

  // Validate request body
  if (!latitude || !longitude || !description || !type || !severity || !cartype) {
    console.error("Invalid road hazard data:", req.body);
    return res
      .status(400)
      .json({ error: "Invalid data. Provide latitude, longitude, description, type, and severity." });
  }
  app.use(express.json());

app.post('/submit-rating', (req, res) => {
  const rating = req.body.rating;
  console.log(`Received rating: ${rating}`);
  // Save the rating to a database or perform other actions
  res.json({ success: true, message: "Rating received" });
});

  // Ensure type is either "pothole" or "speed_breaker"
  if (type !== "pothole" && type !== "speed_breaker") {
    return res
      .status(400)
      .json({ error: "Invalid type. Must be 'pothole' or 'speed_breaker'." });
  }

  const newHazard = { latitude, longitude, description, type, severity , cartype};
  roadHazards.push(newHazard);  // Save the new hazard

  console.log("New road hazard added:", newHazard);
  res.status(201).json(newHazard);
});

// Serve the HTML file for testing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files (e.g., JavaScript, CSS)
app.use(express.static(path.join(__dirname)));

// Error handling for unsupported routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
