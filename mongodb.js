const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/pothole';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the User schema and model
const userSchema = new mongoose.Schema({
    type: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    description:{type: String, required: true },
    severity: {type: String, required: true },
    cartype:{type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Pothole API');
});

// GET route to fetch pothole data
app.get('/getAllData', async (req, res) => {
    try {
        const allData = await User.find({});
        res.send({ status: 'ok', data: allData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error fetching data from the database' });
    }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
