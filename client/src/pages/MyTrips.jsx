import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import TripCard from '../components/ui/TripCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MOCK_TRIPS = []; // Kept for reference or removed if unused

export default function MyTrips() {
    const navigate = useNavigate();

    const [trips, setTrips] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/api/trips')
            .then(res => res.json())
            .then(data => setTrips(data))
            .catch(err => console.error(err));
    }, []);

    // Filter only completed trips
    const pastTrips = trips.filter(trip => trip.status === 'Completed');

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
                    <p className="mt-1 text-slate-500">History of your past journeys.</p>
                </div>
                <Button onClick={() => navigate('/create-trip')}>
                    <Plus className="mr-2 h-5 w-5" />
                    New Trip
                </Button>
            </div>

            {/* Past Trips Section or Empty State */}
            {pastTrips.length > 0 ? (
                <div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pastTrips.map((trip, index) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <TripCard trip={trip} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 rounded-full bg-slate-100 p-6">
                        <Plus className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">You have not traveled yet</h3>
                    <p className="mt-2 text-slate-500 max-w-sm mx-auto">
                        Your travel history is empty. Start your first adventure today!
                    </p>
                    <Button onClick={() => navigate('/create-trip')} className="mt-6">
                        Plan your first trip
                    </Button>
                </div>
            )}
        </div>
    );
}
