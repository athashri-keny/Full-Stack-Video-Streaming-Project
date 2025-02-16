// src/components/CloudinaryVideo.js
import React from 'react';

const CloudinaryVideo = ({ publicId, width = 640, title = "Video" }) => {
  const cloudName = "carti"; // Replace with your Cloudinary cloud name
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/fl_streaming/${publicId}.m3u8`;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <video controls width={width}>
        <source src={videoUrl} type="application/x-mpegURL" />
        Your browser does not support HLS streaming.
      </video>
    </div>
  );
};

export default CloudinaryVideo;
