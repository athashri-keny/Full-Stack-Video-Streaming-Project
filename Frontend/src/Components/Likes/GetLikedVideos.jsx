import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SideNav from '../SideNav/SideNav'

function LikesVideos() {
  const [likedVideos, setLikedVideos] = useState([])

  useEffect(() => {
    const GetLikedVideos = async () => {
      try {
        const response = await axios.get('/api/likes/GetLikedVideos')
        // response.data.data.LikedVideos is an array where each item has its own LikedVideos array
        const fetchedLikedVideos = response.data.data.LikedVideos
        // Flatten the nested arrays to get a single array of video objects
        const flattenedVideos = fetchedLikedVideos.flatMap(item => item.LikedVideos)
        setLikedVideos(flattenedVideos)
        console.log(response)
      } catch (error) {
        console.error("Error fetching liked videos", error)
      }
    }

    GetLikedVideos()
  }, [])

  return (
    <div className="flex-1">
      {likedVideos.length === 0 ? (
        <p className="text-center text-gray-600">Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {likedVideos.map((video) => (
            <div key={video._id}>
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover hover:opacity-25"
              />

              {/* Video Details */}
              <div className="p-2">
                <h2 className="text-md font-semibold line-clamp-2">{video.title}</h2>
                <div className="flex justify-between text-gray-500 text-xs mt-1">
                  <span>Views: {video.views}</span>
                  <span>Likes: {video.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <SideNav/>
    </div>
    
  )
}

export default LikesVideos
