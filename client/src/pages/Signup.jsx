import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plane, Map } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            await signup(email, password, firstName, lastName);
            navigate('/dashboard');
        } catch (error) {
            console.error("Signup failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-row-reverse">
            {/* Right Interface - Form (Reversed layout for Signup) */}
            <div className="flex w-full flex-col justify-center bg-white px-8 md:w-1/2 lg:w-5/12 xl:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-full max-w-md space-y-8"
                >
                    <div className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 text-secondary-600 mb-4">
                            <Plane className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create account</h1>
                        <p className="text-slate-500">Start your journey with GlobeTrotter today.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                placeholder="John"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Doe"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <Input
                            label="Email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit" className="w-full bg-secondary-600 hover:bg-secondary-700 shadow-secondary-500/20" isLoading={isLoading}>
                            Create account
                        </Button>

                        <p className="text-xs text-slate-500 text-center">
                            By clicking create account, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                        </p>
                    </form>

                    <p className="text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-secondary-600 hover:text-secondary-500">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Left Interface - Image */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Travel"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30" />
                <div className="absolute top-10 left-10 text-white">
                    <Map className="h-8 w-8 text-secondary-400 mb-2" />
                    <h2 className="text-3xl font-bold">Uncharted Territories</h2>
                </div>
            </div>
        </div>
    );
}
