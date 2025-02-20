// VideoPlayerPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import CloudinaryPlayer from '../Components/Cloudinary/CloudinaryPlayer';

const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [publicId, setPublicId] = useState('');
  const [channel , setChannelData] = useState("")
  const { VideoId } = useParams();
  const navigate = useNavigate();


  useEffect(() => { 
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/api/videos/c/${VideoId}`);
        setVideo(response.data);
        setPublicId(response.data.data.video.VideoCloudinaryPublicId); 
        console.log(response)
         setChannelData(response.data.data.channel)
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
return (
  <div className="video-player-container">
    <h1>{video?.title}</h1>
    <CloudinaryPlayer 
    key={publicId}
      publicId={publicId} 
      width="640" 
      height="360"
    />
     <div className="max-w-3xl mx-auto my-6 p-4 bg-white shadow rounded-lg flex items-center space-x-4">
    <img
      src={channel.avatar}
      alt="Channel Avatar"
      className="w-16 h-16 rounded-full"
    />
    <div>
      <h2 className="text-xl font-bold">{channel.username}</h2>
      <p className="text-gray-600"> subscribers count:{channel.subscibersCount}</p>
    </div>
  </div>
  </div>
);

}
export default VideoPlayerPage;