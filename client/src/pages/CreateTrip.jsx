import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar as CalendarIcon, Wallet, ArrowRight, ArrowLeft, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { cn } from '../lib/utils';

const STEPS = [
    { id: 'destination', title: 'Where to?', subtitle: 'Pick your dream destination', icon: MapPin },
    { id: 'dates', title: 'When?', subtitle: 'Select your travel dates', icon: CalendarIcon },
    { id: 'details', title: 'Trip Details', subtitle: 'Give your trip a name', icon: FileText },
    { id: 'budget', title: 'Budget', subtitle: 'Set your spending style', icon: Wallet },
];

export default function CreateTrip() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        city: '',
        startDate: '',
        endDate: '',
        name: '',
        description: '',
        coverPhoto: '',
        budget: 'medium'
    });

    const handleNext = async () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            // Finish - Save Trip to Backend
            try {
                const response = await fetch('http://localhost:5000/api/trips', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const newTrip = await response.json();
                    // Navigate to My Trips to see the new trip
                    navigate('/trips');
                } else {
                    console.error("Failed to create trip");
                }
            } catch (error) {
                console.error("Error creating trip:", error);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(c => c - 1);
        } else {
            navigate('/dashboard');
        }
    };

    const StepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <Input
                            label="City or Country"
                            placeholder="e.g. Kyoto, Japan"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            autoFocus
                            className="text-lg"
                        />
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['Paris', 'Bali', 'New York', 'Tokyo'].map(city => (
                                <button
                                    key={city}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, city })}
                                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Start Date"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                        <Input
                            label="End Date"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <Input
                            label="Trip Name"
                            placeholder="e.g. Summer Vacation 2024"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                className="flex w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary-500 focus:ring-primary-500/20"
                                rows={3}
                                placeholder="Briefly describe your trip..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <Input
                            label="Cover Photo URL (Optional)"
                            placeholder="https://images.unsplash.com..."
                            value={formData.coverPhoto}
                            onChange={(e) => setFormData({ ...formData, coverPhoto: e.target.value })}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {[
                            { id: 'low', label: 'Budget', icon: '$' },
                            { id: 'medium', label: 'Moderate', icon: '$$' },
                            { id: 'high', label: 'Luxury', icon: '$$$' },
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setFormData({ ...formData, budget: option.id })}
                                className={cn(
                                    "flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all hover:bg-slate-50",
                                    formData.budget === option.id
                                        ? "border-primary-600 bg-primary-50 text-primary-700"
                                        : "border-slate-100 text-slate-600"
                                )}
                            >
                                <span className="text-2xl font-bold mb-2">{option.icon}</span>
                                <span className="font-medium">{option.label}</span>
                            </button>
                        ))}
                    </div>
                );
            default: return null;
        }
    };

    const CurrentIcon = STEPS[currentStep].icon;

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
            <motion.div
                layout
                className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200"
            >
                {/* Progress Bar */}
                <div className="h-2 w-full bg-slate-100">
                    <motion.div
                        className="h-full bg-primary-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="p-8 md:p-12">
                    <div className="mb-8 flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                            <CurrentIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{STEPS[currentStep].title}</h2>
                            <p className="text-slate-500">{STEPS[currentStep].subtitle}</p>
                        </div>
                    </div>

                    <div className="min-h-[200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <StepContent />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-slate-600">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button onClick={handleNext} className="rounded-full px-8">
                            {currentStep === STEPS.length - 1 ? 'Build Itinerary' : 'Next'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
