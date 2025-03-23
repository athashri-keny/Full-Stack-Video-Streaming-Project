import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { useParams , Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideNav from '../SideNav/SideNav'




function ManageVideos() {
  const [videos , setVideos] = useState([])
  
  const darkMode = useSelector((state) => state.theme.DarkMode);
  const API_BASE  = import.meta.env.VITE_API_URL;


   
  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${API_BASE}/api/videos/VideoUploadByOwner`) // get all videos 
              setVideos(response.data.data.videos)
           } catch (error) {
            console.log(error , "error while fetching the video")
        }
    }
    fetchVideos()
} , [])


return  <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
<SideNav />
<div className="ml-48 mt-16 p-6 transition-colors duration-300">
  <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
    Your Videos
  </h1>
  
  {videos.length === 0 ? (
    <p className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
     You haven’t uploaded any videos yet. Start sharing your content today!
    </p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <div
          key={video._id}
          className={`flex flex-col rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
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
          <div className="p-4 flex flex-col flex-grow">
            <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {video.title}
            </h2>
            
            <div className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>{video.views} views</span> •   <span>{video.likes} likes</span>
            </div>

            <div className="mt-auto">
              <Link
                to={`/EditVideoDetails/${video._id}`}
                className={`w-full text-center block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Edit Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>
}

export default ManageVideos