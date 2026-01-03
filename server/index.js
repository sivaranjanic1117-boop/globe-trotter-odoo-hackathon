const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('GlobeTrotter API is running');
});

// Mock Auth Routes
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Simple mock logic
    if (email && password) {
        // success
        setTimeout(() => {
            res.json({
                user: {
                    id: '1',
                    name: 'Demo Traveler',
                    email: email
                },
                token: 'mock-jwt-token-123'
            });
        }, 1000);
    } else {
        res.status(400).json({ message: 'Missing credentials' });
    }
});

app.post('/api/auth/signup', (req, res) => {
    const { email, firstName, lastName } = req.body;

    setTimeout(() => {
        res.json({
            user: {
                id: '2',
                name: `${firstName} ${lastName}`,
                email: email
            },
            token: 'mock-jwt-token-456'
        });
    }, 1000);
});

// --- TRIPS API ---
let trips = [
    {
        id: '1',
        title: 'Euro Summer 2024',
        destinations: 4,
        dateRange: 'Jun 15 - Jun 30',
        status: 'Planning',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    },
    {
        id: '2',
        title: 'Kyoto Cherry Blossoms',
        destinations: 2,
        dateRange: 'Mar 20 - Apr 05',
        status: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    },
    {
        id: '3',
        title: 'Iceland Roadtrip',
        destinations: 6,
        dateRange: 'Sep 10 - Sep 18',
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1459&q=80'
    }
];

app.get('/api/trips', (req, res) => {
    res.json(trips);
});

app.post('/api/trips', (req, res) => {
    const newTrip = {
        id: Date.now().toString(),
        title: req.body.title || req.body.destination, // Fallback to destination if no title
        destinations: 1, // Default for now
        dateRange: req.body.dateRange || 'TBD',
        status: 'Planning',
        image: req.body.coverPhoto || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80',
        ...req.body
    };
    trips.push(newTrip);
    res.status(201).json(newTrip);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
