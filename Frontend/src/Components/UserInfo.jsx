import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Header/LogoutBtn';
import { useNavigate } from 'react-router-dom';
import EditAvatar from './EditAvatar';
import EditCoverImage from './EditCoverImage';
import { useSelector } from 'react-redux';


function UserInfo() {
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate()
  const darkMode = useSelector((state) => state.theme.DarkMode);
  const API_BASE  = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/api/v1/users/current-user`, { withCredentials: true })
      .then((response) => {
        setUserdata(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  const handleUpdatePassword = () => {
    // Add your logic for updating the password here
       Navigate('/EditProfile')
       console.log("Button was clicked")
        // You can redirect to a password update page or show a modal
  };

  const HandleUpdateDetails = () => {
    Navigate("/EditNAME")
  }
   
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userdata) {
    return <div>No userData found</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
      darkMode 
        ? 'from-gray-900 via-gray-800 to-gray-900' 
        : 'from-gray-100 via-gray-50 to-gray-100'
    }`}>
      <div className={`w-full max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl transform transition-all duration-500 animate-fade-in-up ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Cover Image */}
        <div className="relative h-64 rounded-2xl overflow-hidden group">
          <img
            src={userdata.coverImage}
            alt="Cover"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
          <EditCoverImage 
            className="absolute bottom-4 right-4 hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-20">
          <div className="relative group">
            <img
              src={userdata.avatar}
              alt="User Avatar"
              className="w-40 h-40 rounded-full border-4 shadow-xl transition-all duration-300 group-hover:scale-110 ${
                darkMode ? 'border-gray-800' : 'border-white'
              }"
            />
            <EditAvatar 
              className="absolute bottom-2 right-2 hover:scale-125 transition-transform duration-300"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mt-8 space-y-2">
          <h2 className={`text-3xl font-bold ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {userdata.fullname}
          </h2>
          <p className={`text-lg ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {userdata.email}
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            @{userdata.username}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={HandleUpdateDetails}
            className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300' 
                : 'bg-gradient-to-r from-blue-500 to-blue-300 hover:from-blue-400 hover:to-blue-200'
            }`}
          >
            Update Details
          </button>

          <button
            onClick={handleUpdatePassword}
            className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300' 
                : 'bg-gradient-to-r from-green-500 to-green-300 hover:from-green-400 hover:to-green-200'
            }`}
          >
            Update Password
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <Logout 
            className={`py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-300' 
                : 'bg-gradient-to-r from-red-500 to-red-300 hover:from-red-400 hover:to-red-200'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;