// CloudinaryVideoPlayer.js
import React, { useEffect, useRef } from 'react';

const CloudinaryPlayer = ({ publicId, width, height }) => {
  const cloudinaryRef = useRef();
  const videoRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    // Load Cloudinary script if not already loaded
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src =  "https://cdn.jsdelivr.net/npm/cloudinary-video-player@2.3.1/dist/cld-video-player.min.js" 
      script.async = true;
      document.body.appendChild(script);
    } else {
      cloudinaryRef.current = window.cloudinary;
    }

    // Initialize player when component mounts or publicId changes
    const initializePlayer = () => {
      if (videoRef.current && !playerRef.current) {
        playerRef.current = cloudinaryRef.current?.videoPlayer(videoRef.current, {
          cloud_name: "carti", // Replace with your Cloudinary cloud name
          autoplay: true,
          muted: true,
          controls: true,
        });
      }
    };

    if (window.cloudinary) {
      initializePlayer();
    } else {
      const checkCloudinary = setInterval(() => {
        if (window.cloudinary) {
          cloudinaryRef.current = window.cloudinary;
          initializePlayer();
          clearInterval(checkCloudinary);
        }
      }, 100);
    }

    // Cleanup on unmount or publicId change
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [publicId]);

  return (
    <video
      ref={videoRef}
      data-cld-public-id={publicId}
      width={width}
      height={height}
    />
  );
};

export default CloudinaryPlayer;