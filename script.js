mapboxgl.accessToken = "pk.eyJ1IjoidGhhcnVuLTE3IiwiYSI6ImNtNWFsZ3B6MjRhYWcya3NkdGxzMThncHgifQ.oAVcEQsQMWIBNWCjRARoeg";

// Initialize map
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

let map;

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  const defaultCenter = [78.704672, 10.790483]; // Default: Trichy
  setupMap(defaultCenter);
}

function setupMap(center) {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 8,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  map.addControl(directions, "top-left");

  // Fetch potholes and plot them
  fetchPotholes();
}

// Fetch potholes from server
async function fetchPotholes() {
  try {
    const response = await fetch("/potholes.json");
    const potholes = await response.json();
    plotPotholes(potholes);
  } catch (error) {
    console.error("Error fetching potholes:", error);
  }
}

// Plot potholes on the map
function plotPotholes(potholes) {
  potholes.forEach((pothole) => {
    markPothole(pothole.lon, pothole.lat, pothole.description);
  });
}

// Add a pothole to the map and server
async function addPothole() {
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  if (!isNaN(latitude) && !isNaN(longitude)) {
    try {
      const response = await fetch("/potholes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: latitude,
          lon: longitude,
          description: "User-reported pothole",
        }),
      });

      if (response.ok) {
        markPothole(longitude, latitude, "User-reported pothole");
        alert("Pothole added successfully!");
      } else {
        alert("Error adding pothole.");
      }
    } catch (error) {
      console.error("Error adding pothole:", error);
    }
  } else {
    alert("Please enter valid latitude and longitude values.");
  }
}

// Mark a pothole on the map
function markPothole(longitude, latitude, description) {
  new mapboxgl.Marker({ color: "red" })
    .setLngLat([longitude, latitude])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `<h3>Pothole Alert</h3><p>${description}</p>`
      )
    )
    .addTo(map);
}
