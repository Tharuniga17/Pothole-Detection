const axios = require('axios');
const fs = require('fs');

// URL to fetch data from
const url = 'http://localhost:4000/getAllData';

// Function to fetch and save data
const fetchDataAndSave = async () => {
  try {
    // Fetch data from the URL
    const response = await axios.get(url);
    
    // Extract data from the response
    const data = response.data?.data; // Assuming the data is in response.data.data
    
    // Save data to potholes.json
    fs.writeFileSync('./potholes.json', JSON.stringify(data, null, 2));
    console.log("Data saved to potholes.json successfully!");
  } catch (error) {
    console.error("Error fetching or saving data:", error);
  }
};

// Execute the function
fetchDataAndSave();
