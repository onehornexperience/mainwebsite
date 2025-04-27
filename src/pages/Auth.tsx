import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { supabase, ensureProfile } from '../utils/supabaseClient';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

interface LocationState {
  from?: string;
  packageDetails?: any;
  isSignUp?: boolean;
}

const Auth = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    number: false,
    special: false,
    uppercase: false,
    lowercase: false
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.isSignUp) {
      setIsSignUp(true);
    }
  }, [location]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordStrength).every(value => value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        if (!termsAccepted) {
          setError('Please accept the terms and conditions');
          setLoading(false);
          return;
        }

        if (!isPasswordValid()) {
          setError('Please ensure your password meets all requirements');
          setLoading(false);
          return;
        }

        // Check if user exists
        const { data: { user: existingUser } } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (existingUser) {
          setError('An account with this email already exists. Please log in instead.');
          setLoading(false);
          return;
        }

        // Proceed with signup
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        });

        if (signUpError) throw signUpError;
        if (!user) throw new Error('Signup failed');

        // Create profile
        const profileCreated = await ensureProfile(user.id, {
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          terms_accepted: termsAccepted,
          terms_accepted_at: new Date().toISOString()
        });

        if (!profileCreated) {
          throw new Error('Failed to create user profile');
        }

        // Create audit log entry
        await supabase
          .from('auth_audit_log')
          .insert([{
            user_id: user.id,
            event_type: 'signup',
            ip_address: 'client-ip',
            user_agent: navigator.userAgent
          }]);

        setSuccess('Account created successfully! You can now log in.');
        setTimeout(() => {
          setIsSignUp(false);
        }, 2000);
      } else {
        // Sign in
        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (signInError) {
          setError('Invalid email or password');
          setLoading(false);
          return;
        }

        if (!user) {
          setError('Login failed');
          setLoading(false);
          return;
        }

        // Ensure profile exists
        const profileCreated = await ensureProfile(user.id, {
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address
        });

        if (!profileCreated) {
          throw new Error('Failed to verify user profile');
        }

        // Log the login event
        await supabase
          .from('auth_audit_log')
          .insert([{
            user_id: user.id,
            event_type: 'login',
            ip_address: 'client-ip',
            user_agent: navigator.userAgent
          }]);

        // Navigate to the appropriate page
        const state = location.state as LocationState;
        navigate(state?.from || '/profile');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email);
      if (error) throw error;
      setSuccess('Password reset instructions sent to your email');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative py-24 px-4 sm:px-6 lg:px-8"
         style={{ 
           backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
           backgroundAttachment: 'fixed'
         }}>
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm"></div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md mt-16">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-10">
            <div className="h-28 w-28 p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
              <img 
                src="/ohe-white2.0.png"
                alt="One Horn Experience"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=200&h=200&fit=crop&crop=faces&auto=format&q=80';
                }}
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-200 text-lg font-medium">
            {isSignUp ? 'Start planning your next extraordinary event' : 'Sign in to access your account'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center p-4 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm animate-fade-in">
            <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
            <p className="text-sm text-green-200">{success}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-7">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2.5">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2.5">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2.5">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 6002788139"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2.5">
                    Address
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors duration-200" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-medium text-white/90 mb-4">
                      Password Requirements
                    </h4>
                    <ul className="space-y-3">
                      {Object.entries(passwordStrength).map(([key, isValid]) => (
                        <li key={key} className="flex items-center">
                          {isValid ? (
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400 mr-2.5" />
                          )}
                          <span className={`text-sm ${isValid ? 'text-green-400' : 'text-gray-400'}`}>
                            {key === 'length' ? 'At least 8 characters' :
                             key === 'number' ? 'At least one number' :
                             key === 'special' ? 'At least one special character' :
                             key === 'uppercase' ? 'At least one uppercase letter' :
                             'At least one lowercase letter'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-400 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2.5 text-sm text-gray-300">
                      I accept the <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">Terms and Conditions</a> and{' '}
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-400 rounded"
                  />
                  <label htmlFor="remember" className="ml-2.5 text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (isSignUp && !isPasswordValid())}
              className={`w-full flex justify-center items-center py-4 px-4 rounded-xl text-white text-sm font-medium ${
                loading || (isSignUp && !isPasswordValid())
                  ? 'bg-indigo-500/50 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
              } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Toggle signup/signin */}
        <p className="mt-10 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
            }}
            className="text-white/90 hover:text-white font-medium transition-colors duration-200"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;