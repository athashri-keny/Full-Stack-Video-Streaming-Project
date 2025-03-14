import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function VideoHistory() {
const [videos , setVideos] = useState([])
useEffect(() => {
    
try {
    const FetchHistory =  async () => {
     const response =  await axios.get("/api/users/history")
     console.log(response , "Watch History Fetch Successfully")
     setVideos(response.data.data)
    }
 FetchHistory()
  } catch (error) {
      console.error("Error while fetching watch History")
  }
} , [])

  return (
    <div>
        <div>
            <div>
         {/* Main Content / Video Grid */}
         <div className="flex-1">
            {videos.length === 0 ? (
              <p className="text-center text-gray-600"> No Watch History</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {videos.map((video ) => (
                  <div
                    key={video._id}
                    to={`/watch/c/${video._id}/c/${video.owner}`}
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
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoHistory