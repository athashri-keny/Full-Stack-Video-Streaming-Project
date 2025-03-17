import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SideNav from '../Components/SideNav/SideNav'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

function Home() {
  const [videos, setVideos] = useState([])
  const darkMode = useSelector((state) => state.theme.DarkMode)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos')
        setVideos(response.data.videos)
      } catch (error) {
        console.log(error, "error while fetching the video")
      }
    }
    fetchVideos()
  }, [])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <SideNav />
      <div className="ml-48 mt-16 p-6 transition-colors duration-300">
        {videos.length === 0 ? (
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No Videos
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Link
                key={video._id}
                to={`/watch/c/${video._id}/c/${video.owner}`}
                className={`block rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 object-cover hover:opacity-25"
                />

                {/* Video Details */}
                <div className="p-4">
                  <h2 className={`font-semibold line-clamp-2 mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {video.title}
                  </h2>
                  <div className={`flex justify-between text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>{video.views} views</span>
                    <span>{video.likes} likes</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition duration-300  hover:bg-opacity-300">
                    <FontAwesomeIcon 
                      icon={faPlayCircle} 
                      className="text-black text-center text-4xl opacity-0 transition-opacity duration-300 hover:opacity-200" 
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
