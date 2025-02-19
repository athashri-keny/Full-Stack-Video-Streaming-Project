// VideoPlayerPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloudinaryPlayer from '../Components/Cloudinary/CloudinaryPlayer';

const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [publicId, setPublicId] = useState('');
  const { VideoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/api/videos/c/${VideoId}`);
        setVideo(response.data);
        setPublicId(response.data.data.VideoCloudinaryPublicId); // Assuming your API returns publicId
         console.log( "Public ID = " , response.data.data.VideoCloudinaryPublicId)
      } catch (error) {
        console.error('Error fetching video:', error);
        navigate('/');
      }
    };

    fetchVideoData();
  }, [VideoId, navigate]);

  if (!publicId) return <div>Loading video...</div>;

  

  // VideoPlayerPage.js
return (
  <div className="video-player-container">
    <h1>{video?.title}</h1>
    <CloudinaryPlayer 
      publicId={publicId} 
      width="640" 
      height="360"
    />
  </div>
);
};

export default VideoPlayerPage;