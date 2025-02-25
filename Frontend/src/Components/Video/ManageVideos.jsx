import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams , Link } from 'react-router-dom'

function ManageVideos() {
  const [videos , setVideos] = useState([])

   
  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await axios.get('/api/videos') // get all videos 
                   setVideos(response.data.videos)
        } catch (error) {
            console.log(error , "error while fetching the video")
        }
    }
    fetchVideos()
} , [])


return (
  <div className="flex-1">
    {videos.length === 0 ? (
      <p className="text-center text-gray-600">Loading videos...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Thumbnail wrapped in a Link */}
            <Link to={`/watch/c/${video._id}`}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover hover:opacity-75"
              />
            </Link>
            {/* Video details and action buttons */}
            <div className="p-2">
              <p className="text-sm font-semibold">{video.title}</p>
              <div className="mt-2 flex space-x-2">
                <Link
                  to={`/edit-video/${video._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
                >
                  Edit Video Details
                </Link>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
); 
  
}

export default ManageVideos