import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, User, LogOut, Compass } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const isActive = (path) => location.pathname === path;
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                            <Plane className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">GlobeTrotter</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/dashboard" className={cn("text-sm font-medium transition-colors hover:text-primary-600", isActive('/dashboard') ? "text-primary-600" : "text-slate-600")}>
                            Dashboard
                        </Link>
                        <Link to="/trips" className={cn("text-sm font-medium transition-colors hover:text-primary-600", isActive('/trips') ? "text-primary-600" : "text-slate-600")}>
                            My Trips
                        </Link>
                        <Link to="/explore" className={cn("text-sm font-medium transition-colors hover:text-primary-600", isActive('/explore') ? "text-primary-600" : "text-slate-600")}>
                            Explore
                        </Link>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <Link to="/create-trip">
                            <Button size="sm" variant="ghost" className="hidden md:flex">
                                <Compass className="mr-2 h-4 w-4" />
                                Plan Trip
                            </Button>
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 transition-colors hover:border-primary-300 hover:bg-slate-200"
                            >
                                <User className="h-5 w-5 text-slate-500" />
                            </button>

                            {isProfileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-slate-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 py-1">
                                        <div className="px-4 py-3 border-b border-slate-50">
                                            <p className="text-sm font-medium text-slate-900">{user?.name || 'Traveler'}</p>
                                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            onClick={handleLogout}
                                        >
                                            <div className="flex items-center">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sign out
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
