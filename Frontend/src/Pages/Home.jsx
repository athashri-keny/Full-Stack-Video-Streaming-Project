import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import SideNav from '../Components/SideNav/SideNav'

function Home() {
const [videos , setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('/api/videos') // get all videos 
                console.log( "Video Fetched Sucessfully" , response.data.videos)
                setVideos(response.data.videos)
            } catch (error) {
                console.log(error , "error while fetching the video")
            }
        }
        fetchVideos()
    } , [])

    return (
      <div className="container mx-auto p-2"> {/* Reduced padding from p-6 to p-2 */}
        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-1/4 pr-2"> {/* Reduced margin from mr-4 to pr-2 */}
            <SideNav />
          </div>
          {/* Main Content / Video Grid */}
          <div className="flex-1">
            {videos.length === 0 ? (
              <p className="text-center text-gray-600">Loading videos...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {videos.map((video) => (
                  <Link
                    key={video._id}
                    to={`/watch/c/${video._id}`}
                    className="block bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover hover:opacity-25"
                    />
        
                    {/* Video Details */}
                    <div className="p-2"> {/* Reduced padding from p-3 to p-2 */}
                      <h2 className="text-md font-semibold line-clamp-2">{video.title}</h2>
                      <div className="flex justify-between text-gray-500 text-xs mt-1"> {/* Reduced margin from mt-2 to mt-1 */}
                        <span>Views: {video.views}</span>
                        <span>Likes: {video.likes}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
    };
    
 
export default Home