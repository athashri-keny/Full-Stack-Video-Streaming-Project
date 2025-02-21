// VideoPlayerPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import CloudinaryPlayer from '../Components/Cloudinary/CloudinaryPlayer';
import Input from '../Components/input'

const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [publicId, setPublicId] = useState('');
  const [channel , setChannelData] = useState([])
  const [comments , setComments] = useState("")
  const { VideoId } = useParams();
  const navigate = useNavigate();


  useEffect(() => { 
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/api/videos/c/${VideoId}`);
        setVideo(response.data.data.video);

        setPublicId(response.data.data.video.VideoCloudinaryPublicId);

        setComments(response.data.data.Comments) 

        setChannelData(response.data.data.channel)

        console.log(response)
    
         } catch (error) {
        console.error('Error fetching video:', error);
        navigate('/');
      }
    };


    fetchVideoData();
  }, [VideoId, navigate ]);

    // channel inf

  if (!publicId) return <div>Loading video...</div>;


  // VideoPlayerPage.js
return  (
  <div className="max-w-4xl mx-auto p-4">
    {/* Video Player */}
    <CloudinaryPlayer key={publicId} publicId={publicId} width="1024" height="450" className="w-full" />

    {/* Video Title */}
    <h1 className="text-2xl font-bold mt-4">{video?.title || 'Video Title'}</h1>

   {/* Channel Details */}
   {channel && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <img src={channel.avatar} alt="Channel Avatar" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-medium text-lg">{channel.username || 'Channel Name'}</p>
              <p className="text-sm text-gray-500">Subscribers {channel.subscribersCount || 0} </p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Subscribe</button>
        </div>
      )}

    {/* Video Description */}
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <p className="text-gray-700">{video?.description || 'This is the video description.'}</p>
    </div>

    {/* Comments Section */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Comments</h2>

      {/* Add Comment Input */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <Input type="text" placeholder="Add a comment..." className="flex-grow p-2 border border-gray-300 rounded-lg" />
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium">{channel.username || 'User Name'}</p>
                <p className="text-gray-700">{comment.content || 'This is a comment on the video.'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  </div>
);

}
export default VideoPlayerPage;