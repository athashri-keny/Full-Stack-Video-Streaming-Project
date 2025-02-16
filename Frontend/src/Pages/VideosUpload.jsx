// src/pages/VideoInputPage.js
import React, { useState } from 'react';
import CloudinaryVideo from '../components/CloudinaryVideo';

const VideoInputPage = () => {
  // State to store user input
  const [title, setTitle] = useState('');
  const [publicId, setPublicId] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  // When the form is submitted, show the video
  const handleSubmit = (e) => {
    e.preventDefault();
    if (publicId && title) {
      setShowVideo(true);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-1">Video Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter video title"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Public ID:</label>
          <input
            type="text"
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter Cloudinary public ID"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Stream Video
        </button>
      </form>
      
      {/* Render the video only if both title and publicId are provided */}
      {showVideo && publicId && title && (
        <CloudinaryVideo publicId={publicId} title={title} />
      )}
    </div>
  );
};

export default VideoInputPage;
