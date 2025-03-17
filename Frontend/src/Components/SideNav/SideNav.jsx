// src/components/SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faHouse, faThumbsUp, faList, faUpload, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const SideNav = () => {
  const darkMode = useSelector((state) => state.theme.DarkMode);

  return (
    <div 
      className={`fixed top-0 left-0 h-screen mt-16 w-48 ${darkMode ? 'bg-gray-900' : 'bg-white'} 
        p-6 transition-transform duration-300 transform shadow-xl z-40`}
    >
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className={`flex items-center space-x-3 p-3 rounded-lg 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                transition-all duration-300 hover:translate-x-2`}
            >
              <FontAwesomeIcon icon={faHouse} className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={`flex items-center space-x-3 p-3 rounded-lg 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                transition-all duration-300 hover:translate-x-2`}
            >
              <FontAwesomeIcon icon={faClockRotateLeft} className="w-5 h-5" />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link
              to="/liked-videos"
              className={`flex items-center space-x-3 p-3 rounded-lg 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                transition-all duration-300 hover:translate-x-2`}
            >
              <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5" />
              <span>Liked Videos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/playlists"
              className={`flex items-center space-x-3 p-3 rounded-lg 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                transition-all duration-300 hover:translate-x-2`}
            >
              <FontAwesomeIcon icon={faList} className="w-5 h-5" />
              <span>Playlists</span>
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className={`flex items-center space-x-3 p-3 rounded-lg 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                transition-all duration-300 hover:translate-x-2`}
            >
              <FontAwesomeIcon icon={faUpload} className="w-5 h-5" />
              <span>Upload</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-videos"
              className={`flex items-center space-x-3 p-3 rounded-lg 
                ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} 
                transition-all duration-300 hover:translate-x-2`}
            >
              <FontAwesomeIcon icon={faGear} className="w-5 h-5" />
              <span>Manage Videos</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;