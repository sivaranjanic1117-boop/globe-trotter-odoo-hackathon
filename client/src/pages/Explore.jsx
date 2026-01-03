import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, ArrowRight, Umbrella, Mountain, Building2, Trees, Tent } from 'lucide-react';
import Button from '../components/ui/Button';
import { PLACES } from '../data/places';

const CATEGORIES = [
    { id: 'beach', name: 'Beaches', icon: Umbrella },
    { id: 'mountain', name: 'Mountains', icon: Mountain },
    { id: 'city', name: 'City Breaks', icon: Building2 },
    { id: 'nature', name: 'Nature', icon: Trees },
    { id: 'camping', name: 'Camping', icon: Tent },
];

// FEATURED_PLACES removed in favor of imported PLACES

export default function Explore() {
    const [activeCategory, setActiveCategory] = useState('beach');

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2921&auto=format&fit=crop"
                    alt="Travel Hero"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-white md:text-6xl"
                    >
                        Explore the World
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 max-w-lg text-lg text-slate-200"
                    >
                        Discover new destinations and hidden gems for your next adventure.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex w-full max-w-md items-center rounded-full bg-white p-2 shadow-lg"
                    >
                        <Search className="ml-4 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="flex-1 border-none bg-transparent px-4 py-2 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-0"
                        />
                        <Button className="rounded-full px-6">Search</Button>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto mt-16 px-4 md:px-6">
                {/* Categories */}
                <div className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold text-slate-900">Categories</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                        {CATEGORIES.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex min-w-[120px] flex-col items-center justify-center rounded-xl border p-4 transition-all ${activeCategory === category.id
                                        ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className="mb-2 h-6 w-6" />
                                    <span className="text-sm font-medium">{category.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Popular Destinations */}
                <div className="mb-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Popular Destinations</h2>
                        <Button variant="ghost" className="text-primary-600 hover:text-primary-700">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {PLACES.filter(place => activeCategory === 'all' || place.category === activeCategory).map((place, index) => (
                            <motion.div
                                key={place.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md border border-slate-100"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-slate-900 backdrop-blur-sm">
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span>{place.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{place.name}</h3>
                                            <div className="flex items-center text-slate-500 text-sm mt-1">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                <span>{place.country}</span>
                                            </div>
                                        </div>
                                        <span className="font-semibold text-primary-600">{place.price}</span>
                                    </div>
                                    <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                                        {place.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
