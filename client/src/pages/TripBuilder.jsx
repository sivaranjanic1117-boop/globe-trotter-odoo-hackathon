import React from 'react';
import { useParams } from 'react-router-dom';

export default function TripBuilder() {
    const { tripId } = useParams();

    return (
        <div className="h-full p-8">
            <h1 className="text-3xl font-bold">Itinerary Builder</h1>
            <p className="text-slate-500">Trip ID: {tripId}</p>
            <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
                <p className="text-xl text-slate-400">Drag & Drop Interface Coming Next...</p>
            </div>
        </div>
    );
}
