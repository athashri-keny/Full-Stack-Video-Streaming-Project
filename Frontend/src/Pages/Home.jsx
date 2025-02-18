import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import VideoPlayerPage from './VideoPlayer'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'

function Home() {
const [videos , setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('/api/videos')
                console.log( "Video Fetched Sucessfully" , response.data.videos)
                setVideos(response.data.videos)
            } catch (error) {
                console.log(error , "error while fetching the video")
            }
        }
        fetchVideos()
    } , [])

    return (
      <div className="container mx-auto p-6">
              <Link to={`/videos/${videos._id}`} className='block'/>
        {videos.length === 0 ? (
          <p className="text-center text-gray-600">Loading videos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Thumbnail */}
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 object-cover" 
                />
                {/* Video Details */}
                <div className="p-3">
                  <h2 className="text-md font-semibold line-clamp-2">{video.title}</h2> 
                  <div className="flex justify-between text-gray-500 text-xs mt-2">
                    <span>Views: {video.views}</span>
                    <span>Likes: {video.likes}</span>
                  </div>
            
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

export default Home