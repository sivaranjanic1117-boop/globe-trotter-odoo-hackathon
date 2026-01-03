import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSave = async () => {
        // TODO: API call to update profile
        console.log('Saving profile:', formData);
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
                        <p className="mt-1 text-slate-500">Manage your account information</p>
                    </div>
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </div>

                {/* Profile Card */}
                <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6 pb-8 border-b border-slate-100">
                        <div className="relative">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-3xl font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50">
                                    <Camera className="h-4 w-4 text-slate-600" />
                                </button>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                            <p className="text-slate-500">{user?.email}</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? 'bg-slate-50' : ''}
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? 'bg-slate-50' : ''}
                            />
                        </div>

                        {isEditing && (
                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h3>
                                <div className="space-y-4">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        placeholder="Enter current password"
                                        value={formData.currentPassword}
                                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    />
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="New Password"
                                            type="password"
                                            placeholder="Enter new password"
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        />
                                        <Input
                                            label="Confirm New Password"
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
                                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-6">
                        <div className="text-sm font-medium text-primary-600 uppercase tracking-wider">Total Trips</div>
                        <div className="mt-2 text-3xl font-bold text-primary-900">0</div>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-secondary-50 to-secondary-100 p-6">
                        <div className="text-sm font-medium text-secondary-600 uppercase tracking-wider">Countries Visited</div>
                        <div className="mt-2 text-3xl font-bold text-secondary-900">0</div>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6">
                        <div className="text-sm font-medium text-green-600 uppercase tracking-wider">Member Since</div>
                        <div className="mt-2 text-xl font-bold text-green-900">Jan 2026</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}