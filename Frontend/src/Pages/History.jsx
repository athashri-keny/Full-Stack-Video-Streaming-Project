// src/pages/History.js
import React from 'react';
import VideoHistory from '../Components/Video/VideoHistory';
import  SideNav from '../Components/SideNav/SideNav'

const History = () => {
  return (
  <div className="flex">
        {/* Side Navigation */}
        <div className="w-1/4 pr-2">
          <SideNav />
        </div>
        {/* Videos Section */}
        <div className="w-3/4">
          <VideoHistory />
        </div>
      </div>
  );
};

export default History;
