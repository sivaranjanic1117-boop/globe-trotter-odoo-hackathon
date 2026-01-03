import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function TripCard({ trip }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 transition-all hover:shadow-md"
        >
            {/* Image Cover */}
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={trip.image}
                    alt={trip.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{trip.title}</h3>
                    <div className="mt-1 flex items-center space-x-2 text-sm opacity-90">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.destinations} Cities</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center space-x-2 text-sm text-slate-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{trip.dateRange}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex space-x-2">
                        <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors" title="Edit Trip">
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete Trip">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    <Link to={`/trips/${trip.id}`} className="inline-flex items-center rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                        View <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
