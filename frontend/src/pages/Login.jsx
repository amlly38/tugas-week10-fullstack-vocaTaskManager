import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, ArrowLeftIcon } from '@heroicons/react/solid';
import { BriefcaseIcon } from '@heroicons/react/outline';
import { loginUser } from '../api/userApi';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.data.token);
      navigate('/task');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500 px-4">
      <div className="relative bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center transform transition-all duration-300 ease-in-out hover:scale-105">
        
        {/* Tombol Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-400 hover:text-white transition"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>

        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <BriefcaseIcon className="h-8 w-8 text-purple-400 mr-2" />
          DailiDo
        </h1>
        <p className="text-lg text-gray-300 mb-6">Task Management</p>

        <div className="mb-4">
          <label className="block text-gray-400 text-left">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 text-left">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-purple-500 transition-all"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-gray-400">
            <input type="checkbox" className="mr-2 h-4 w-4 text-purple-500 border-gray-600 rounded focus:ring-purple-400" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-purple-400 hover:underline text-sm">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
        >
          Sign In
        </button>

        <div className="mt-4 text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-purple-400 hover:underline font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
