import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import TripCard from '../components/ui/TripCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MOCK_TRIPS = [
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

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="mt-1 text-slate-500">Welcome back! Here are your trips.</p>
                </div>
                <Button onClick={() => navigate('/create-trip')}>
                    <Plus className="mr-2 h-5 w-5" />
                    New Trip
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_TRIPS.map((trip, index) => (
                    <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <TripCard trip={trip} />
                    </motion.div>
                ))}

                {/* Add Trip Placeholder Card */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/create-trip')}
                    className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 transition-colors hover:border-primary-500 hover:bg-primary-50/50"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 group-hover:ring-primary-200 mb-4">
                        <Plus className="h-6 w-6 text-slate-400 group-hover:text-primary-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Create New Trip</h3>
                    <p className="mt-1 text-sm text-slate-500">Start planning your next adventure</p>
                </motion.button>
            </div>
        </div>
    );
}
