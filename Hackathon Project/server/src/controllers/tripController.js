const prisma = require('../utils/prisma');

const getTrips = async (req, res) => {
    try {
        const userId = req.user.userId; // From Middleware
        const trips = await prisma.trip.findMany({
            where: { userId },
            include: { stops: true }, // Include stops in the response
            orderBy: { startDate: 'asc' },
        });
        res.json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createTrip = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, description, startDate, endDate, budget, coverPhoto } = req.body;

        const trip = await prisma.trip.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                budget: budget ? parseFloat(budget) : null,
                coverPhoto,
                userId,
            },
        });

        res.status(201).json(trip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTrip = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        // Verify ownership
        const trip = await prisma.trip.findUnique({ where: { id } });
        if (!trip || trip.userId !== userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await prisma.trip.delete({ where: { id } });
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTripById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        const trip = await prisma.trip.findUnique({
            where: { id },
            include: {
                stops: {
                    orderBy: { orderIndex: 'asc' },
                    include: { activities: true }
                }
            }
        });

        if (!trip) return res.status(404).json({ error: 'Trip not found' });
        if (trip.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

        res.json(trip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getTrips, createTrip, deleteTrip, getTripById };
