// src/components/SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="w-45 h-screen bg-gray-800 text-white p-6">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-gray-400">
              History
            </Link>
          </li>
          <li>
            <Link to="/liked-videos" className="hover:text-gray-400">
              Liked Videos
            </Link>
          </li>
          <li>
            <Link to="/playlists" className="hover:text-gray-400">
              Playlists
            </Link>
          </li>
          <li>
            <Link to="/tweets" className="hover:text-gray-400">
              Tweets
            </Link>
          </li>
          <li>
            <Link to= "/Upload" className='hover:text-gray-400'>
            Upload
            </Link> 
          </li>
          <Link to= '/Manage-Videos' className='hover:text-gray-400'>
          Manage Videos
          </Link>
          
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
