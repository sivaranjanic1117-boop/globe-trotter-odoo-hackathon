import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
