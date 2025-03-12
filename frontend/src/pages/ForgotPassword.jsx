import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from '@heroicons/react/outline';
import { forgotPassword } from '../api/userApi';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await forgotPassword(email);
  
      if (response && response.message) {
        setMessage(response.message);
      } else {
        setMessage('If the email exists, a reset link has been sent.');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('An error occurred. Please try again.');
    }
  };  

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md text-center transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <BriefcaseIcon className="h-8 w-8 text-purple-400 mr-2" /> 
          DailiDo
        </h1>
        <p className="text-lg text-gray-300 mb-6">Forgot Password</p>

        <div>
          <label className="block text-gray-400 text-left">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>  

        {message && <p className="text-gray-300 mt-4">{message}</p>}

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105"
        >
          Reset Password
        </button>

        <div className="mt-4 text-gray-400">
          Remember your password?{' '}
          <Link to="/login" className="text-purple-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
