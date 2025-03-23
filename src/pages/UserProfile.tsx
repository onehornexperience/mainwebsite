import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../utils/supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  LogOut,
  Clock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  avatar_url: string | null;
}

const UserProfile = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    checkAuth();
    loadProfile();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
    }
  };

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Get avatar URL if exists
      if (profile.avatar_url) {
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(profile.avatar_url);
        
        if (data) {
          setAvatarUrl(data.publicUrl);
        }
      }

      setProfile(profile);
      setEditForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let newAvatarUrl = profile?.avatar_url;

      // Handle avatar upload if new file is selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${profile?.id}/${Date.now()}.${fileExt}`;

        // Upload new avatar
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);

        if (uploadError) {
          throw uploadError;
        }

        // Delete old avatar if exists
        if (profile?.avatar_url) {
          await supabase.storage
            .from('avatars')
            .remove([profile.avatar_url]);
        }

        newAvatarUrl = fileName;

        // Get the public URL for the new avatar
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        if (data) {
          setAvatarUrl(data.publicUrl);
        }
      }

      // Update profile
      const updates = {
        full_name: editForm.full_name,
        phone: editForm.phone,
        address: editForm.address,
        avatar_url: newAvatarUrl,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile?.id);

      if (error) throw error;

      // Handle password update if new password is provided
      if (editForm.newPassword) {
        if (editForm.newPassword !== editForm.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        const { error: passwordError } = await supabase.auth.updateUser({
          password: editForm.newPassword
        });

        if (passwordError) throw passwordError;
      }

      setSuccess('Profile updated successfully');
      loadProfile();
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`pt-20 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${isDarkMode ? 'bg-dark-bg-alt' : 'bg-white'} rounded-lg shadow-xl overflow-hidden`}>
          {/* Header */}
          <div className="px-4 sm:px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 sm:mb-0`}>
                My Profile
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-md ${
                    isEditing
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      : 'bg-indigo-600 text-white'
                  } transition-colors`}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Go to Payments
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8">
            {error && (
              <div className="mb-6 flex items-center p-4 rounded-md bg-red-50 border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-center p-4 rounded-md bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                  <div className="relative mb-4 sm:mb-0">
                    {avatarPreview || avatarUrl ? (
                      <img
                        src={avatarPreview || avatarUrl}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`h-24 w-24 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <User className={`h-12 w-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer">
                      <Camera className="h-4 w-4 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Profile Picture
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile?.email}
                      disabled
                      className={`w-full px-4 py-2 rounded-md border bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Address
                    </label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className={`w-full px-4 py-2 rounded-md border ${
                        isDarkMode 
                          ? 'bg-dark-bg border-gray-700 text-white' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Password Change Section */}
                <div className={`mt-8 p-4 sm:p-6 rounded-lg ${isDarkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={editForm.currentPassword}
                          onChange={(e) => setEditForm({ ...editForm, currentPassword: e.target.value })}
                          className={`w-full px-4 py-2 rounded-md border ${
                            isDarkMode 
                              ? 'bg-dark-bg border-gray-700 text-white' 
                              : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          ) : (
                            <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.newPassword}
                        onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-dark-bg border-gray-700 text-white' 
                            : 'border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.confirmPassword}
                        onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-2 rounded-md border ${
                          isDarkMode 
                            ? 'bg-dark-bg border-gray-700 text-white' 
                            : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`px-4 py-2 rounded-md ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Profile Overview */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover mb-4 sm:mb-0"
                    />
                  ) : (
                    <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-4 sm:mb-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <User className={`h-12 w-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </div>
                  )}
                  <div className="sm:ml-6">
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {profile?.full_name}
                    </h2>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {profile?.email}
                    </p>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {profile?.phone || 'No phone number added'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {profile?.address || 'No address added'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                      Account Security
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Shield className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          Password last changed: Never
                        </span>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:text-red-500"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;