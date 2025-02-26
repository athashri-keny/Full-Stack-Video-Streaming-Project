import React from 'react';
import ManageVideos from '../Components/Video/ManageVideos';
import SideNav from '../Components/SideNav/SideNav';

function ManageVideosss() {
  return (
    <div className="flex">
      {/* Side Navigation */}
      <div className="w-1/4 pr-2">
        <SideNav />
      </div>
      {/* Videos Section */}
      <div className="w-3/4">
        <ManageVideos />
      </div>
    </div>
  );
}

export default ManageVideosss;
