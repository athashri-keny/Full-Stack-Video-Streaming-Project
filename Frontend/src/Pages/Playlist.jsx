// src/pages/Playlists.js
import React from 'react';
import SideNav from '../Components/SideNav/SideNav';
import GetuserPlaylists from '../Components/Playlist/GetuserPlaylists';

const Playlists = () => {
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="w-1/4">
        <SideNav />
      </div>
           <GetuserPlaylists/>
      
    </div>
  );
};

export default Playlists;
