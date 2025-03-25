import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import UserInfoButton from './UserInfoButton';
import { changeMode } from '../../Store/ThemeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.DarkMode);
  const [Avatar, setAvatar] = useState('');
  const dispatch = useDispatch();
  const API_BASE  = import.meta.env.VITE_API_URL;


  useEffect(() => {
    axios
      .get(`${API_BASE}/api/v1/users/current-user`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setAvatar(response.data.data.avatar);
        }
      });
  }, []);

  const navItems = [
     {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                My App
              </h1>
            </Link>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navItems.map(
                  (item, index) =>
                    item.active && (
                      <Link
                        key={index}
                        to={item.slug}
                        className="px-3 py-2 rounded-md text-sm font-medium hover:text-purple-600 transition-colors duration-300 transform hover:scale-105"
                      >
                        {item.name}
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => dispatch(changeMode())}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'text-gray-100 hover:bg-gray-700'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="w-5 h-5"
              />
            </button>

            {authStatus && (
              <div className="flex items-center space-x-4">
                {/* Avatar and Profile Button */}
                <div className="flex items-center space-x-2">
                  <img
                    src={Avatar || '/default-avatar.png'}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-purple-500 object-cover shadow-sm hover:shadow-md transition-shadow duration-300"
                  />
                  <Link
                    to="/userinfo"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:text-purple-600 transition-colors duration-300 transform hover:scale-105"
                  >
                    Profile
                  </Link>
                </div>

                {/* UserInfoButton and Logout */}
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;