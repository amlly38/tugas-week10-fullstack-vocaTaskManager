import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { registerUser } from "../api/userApi";
import Modal from "../components/Modal"; // Import Modal

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const data = await registerUser(name, email, password);
      if (data) {
        setModalTitle("Registration Successful");
        setModalMessage("You have successfully registered! Please log in.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setModalTitle("Registration Failed");
      setModalMessage("Something went wrong. Please try again.");
      setIsModalOpen(true);
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

        <h1 className="text-3xl font-bold text-white mb-4">Sign Up</h1>

        <div className="mb-4">
          <label className="block text-gray-400 text-left">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
              type={showPassword ? "text" : "password"}
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

        <button
          type="submit"
          onClick={handleRegister}
          className="w-full py-3 mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
        >
          Sign Up
        </button>

        <div className="mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>

      {/* Modal Error/Sukses */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (modalTitle === "Registration Successful") {
            navigate("/login");
          }
        }}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
}

export default Register;
