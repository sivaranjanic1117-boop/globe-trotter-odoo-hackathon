import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Plane, Map, Luggage } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Interface - Form */}
            <div className="flex w-full flex-col justify-center bg-white px-8 md:w-1/2 lg:w-5/12 xl:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto w-full max-w-md space-y-8"
                >
                    <div className="space-y-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 mb-4">
                            <Plane className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                        <p className="text-slate-500">Enter your credentials to access your trips.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                <span className="text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
                        </div>

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign in
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div>
                            <Button variant="secondary" type="button" className="w-full flex items-center justify-center gap-2">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </Button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-500">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Interface - Image/Showcase */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
                    alt="Travel"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                    <div className="flex items-center space-x-2 mb-4">
                        <Map className="h-5 w-5 text-primary-400" />
                        <span className="text-sm font-medium text-primary-200 uppercase tracking-wider">Explore the world</span>
                    </div>
                    <h2 className="text-4xl font-bold leading-tight mb-4">"The journey of a thousand miles begins with a single step."</h2>
                    <p className="text-lg text-slate-200 max-w-lg">
                        Plan your next adventure with GlobeTrotter. Discover new destinations, manage your itinerary, and travel with peace of mind.
                    </p>
                </div>
            </div>
        </div>
    );
}
