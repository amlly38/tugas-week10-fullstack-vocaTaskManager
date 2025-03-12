import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon } from '@heroicons/react/outline';

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-lg text-center transform transition-all duration-300 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <BriefcaseIcon className="h-10 w-10 text-purple-400 mr-2" />
          DailiDo
        </h1>
        <p className="text-lg text-gray-300 mb-6">Task Management Made Easy</p>

        <p className="text-gray-400 mb-8">
          Organize your tasks efficiently and improve productivity. Sign in or create an account to get started.
        </p>

        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
