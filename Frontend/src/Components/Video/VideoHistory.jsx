import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SideNav from '../SideNav/SideNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'


function VideoHistory() {
const [videos , setVideos] = useState([])
const darkMode = useSelector((state) => state.theme.DarkMode)
const API_BASE  = import.meta.env.VITE_API_URL;

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/users/history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          withCredentials: true // Only if using cookies
        }
      );
      console.log(response, "Watch History Fetched Successfully");
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error while fetching watch history", error);
    }
  };

  fetchHistory();
}, []);

  return (
    (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <SideNav />
        <div className="ml-48 mt-16 p-6 transition-colors duration-300">
          <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Watch History
            <FontAwesomeIcon icon= {faClockRotateLeft} className='pl-2'/>
          </h1>
          {videos.length === 0 ? (
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No Watch History
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div
                  className={`flex flex-col rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  {/* Video Details */}
                  <div className="p-4">
                    <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {video.title}
                    </h2>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>{video.views} views</span> • <span>{video.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  )
  
  
}

export default VideoHistory