import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout as logoutAction } from '../../Store/authslice';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize once at the top
  const API_BASE = import.meta.env.VITE_API_URL;

  const LogoutHandler = async () => {
    const accessToken = localStorage.getItem('accessToken');
    
    try {
      // Send logout request with proper headers
      const response = await axios.post(
        `${API_BASE}/api/v1/users/logout`,
        {}, // no payload needed
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);
      if (response) {
        // Dispatch logout action to update your Redux store
        dispatch(logoutAction());
        // Remove tokens from local storage after a successful logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log("Logged out successfully");
        // Navigate to home page
        navigate('/');
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={LogoutHandler}
      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
    >
      Logout
    </button>
  );
}

export default Logout;
