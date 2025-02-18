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
        const response = await axios.get(`/api/videos/${VideoId}`);
        setVideo(response.data);
        setPublicId(response.data.VideoCloudinaryPublicId); // Assuming your API returns publicId
      } catch (error) {
        console.error('Error fetching video:', error);
        navigate('/not-found');
      }
    };

    fetchVideoData();
  }, [VideoId, navigate]);

  if (!publicId) return <div>Loading video...</div>;

  return (
    <div className="video-player-container">
      <h1>{video?.title}</h1>
      <CloudinaryPlayer 
        publicId={publicId}
        width="100%" 
        height="500px"
      />
    </div>
  );
};

export default VideoPlayerPage;