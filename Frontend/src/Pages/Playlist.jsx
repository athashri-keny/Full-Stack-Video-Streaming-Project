// src/pages/Playlists.js
import React from 'react';
import SideNav from '../Components/SideNav/SideNav';
import GetAndCreatePlaylist from '../Components/Playlist/GetAndCreatePlaylist';

const Playlists = () => {
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="w-1/4">
        <SideNav />
      </div>
           <GetAndCreatePlaylist/>
      
    </div>
  );
};

export default Playlists;
