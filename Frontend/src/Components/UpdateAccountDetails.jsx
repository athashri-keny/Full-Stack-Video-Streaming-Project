import React, { useState } from 'react';
import axios from 'axios';
import Input from './input';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UpdateAccountDetails() {
  const [fullname, setFullname] = useState('');
  const [NewEmail, setNewEmail] = useState('');
  const [Error, setError] = useState(null);
  const darkMode = useSelector((state) => state.theme.DarkMode);
  const [successMessage, setSuccessMessage] = useState('');
  const Navigate = useNavigate();
  const API_BASE  = import.meta.env.VITE_API_URL;


  const UpdateDetails = async (e) => {
    e.preventDefault();
    setError('');
    const data = {
      email: NewEmail,
      fullname: fullname,
    };
    try {
      await axios.patch(`${API_BASE}/api/users/update-account`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccessMessage('Details updated successfully!');
      setTimeout(() => {
        Navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error while updating the details:', error);
      setError('Failed to update details. Please try again.');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
        darkMode
          ? 'from-gray-900 via-gray-800 to-gray-900'
          : 'from-gray-100 via-gray-50 to-gray-100'
      }`}
    >
      <div
        className={`w-full max-w-md p-10 rounded-3xl shadow-2xl transform transition-all duration-500 animate-fade-in-up ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center bg-clip-text mb-8 animate-text-glow ${
            darkMode
              ? 'text-transparent bg-gradient-to-r from-green-400 to-blue-400'
              : 'text-transparent bg-gradient-to-r from-green-600 to-blue-600'
          }`}
        >
          Update Account
        </h2>

        <form onSubmit={UpdateDetails} className="space-y-6">
          {/* Email Input */}
          <div className="animate-slide-in-left">
            <label
              className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                darkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              New Email
            </label>
            <Input
              type="email"
              id="email"
              value={NewEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-blue-400 ${
                darkMode
                  ? 'bg-gray-700 text-black-100 border-gray-600 focus:ring-blue-400/30 focus:border-blue-400'
                  : 'bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500/30 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Full Name Input */}
          <div className="animate-slide-in-right">
            <label
              className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                darkMode
                  ? 'text-gray-300 hover:text-green-400'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              New Full Name
            </label>
            <Input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter new name"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 ${
                darkMode
                  ? 'bg-gray-700 text-black-100 border-gray-600 focus:ring-green-400/30 focus:border-green-400'
                  : 'bg-gray-50 text-gray-900 border-gray-300 focus:ring-green-500/30 focus:border-green-500'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95 ${
              darkMode
                ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                : 'bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500'
            }`}
          >
            Update Details
          </button>
        </form>

        {Error && (
          <p
            className={`mt-4 text-center text-sm animate-pulse ${
              darkMode ? 'text-red-400' : 'text-red-600'
            }`}
          >
            {Error}
          </p>
        )}

        {successMessage && (
          <p
            className={`mt-4 text-center text-sm animate-fade-in ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}
          >
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default UpdateAccountDetails;