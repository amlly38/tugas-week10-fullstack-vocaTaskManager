import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-gray-900 p-12 rounded-2xl shadow-2xl w-full max-w-xl text-center transform transition-all duration-300 ease-in-out hover:scale-105 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-indigo-500 opacity-10 rounded-2xl"></div>
        <h1 className="text-5xl font-extrabold text-white mb-5 flex items-center justify-center relative z-10">
          <BriefcaseIcon className="h-12 w-12 text-purple-400 mr-3" />
          DailiDo
        </h1>
        <p className="text-lg text-gray-300 mb-6 font-medium relative z-10">Task Management Made Easy</p>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6 relative z-10">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <CheckCircleIcon className="h-5 w-5 text-green-400" /> Organize tasks efficiently & improve productivity.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col space-y-4 relative z-10"
        >
          <Link
            to="/login"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;