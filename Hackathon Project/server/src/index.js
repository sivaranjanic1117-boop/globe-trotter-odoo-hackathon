const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow all origins for now to prevent blocking
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Basic Route for Testing
app.get('/', (req, res) => {
    res.json({ message: 'GlobeTrotter Backend is Running! 🌍✈️' });
});

const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
