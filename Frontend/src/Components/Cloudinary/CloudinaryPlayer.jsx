import React, { useEffect, useRef, useState } from 'react';

const CloudinaryPlayer = ({ publicId, width, height }) => {
  const cloudinaryRef = useRef();
  const videoRef = useRef();
  const playerRef = useRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    let script;
    if (!window.cloudinary) {
      script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/cloudinary-video-player@2.3.1/dist/cld-video-player.min.js";
      script.async = true;
      script.onload = () => {
        cloudinaryRef.current = window.cloudinary;
          setScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      cloudinaryRef.current = window.cloudinary;
      setScriptLoaded(true);
    }

    return () => {
      if (script) document.body.removeChild(script);
    };
  }, []);


  useEffect(() => {
    if (!scriptLoaded || !videoRef.current) return;

    playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "carti",
      autoplay: true,
      muted: true,
      controls: true,
    });
    playerRef.current.source({ publicId, cloudName: "carti" });

      }, [scriptLoaded, publicId]);

  return <video ref={videoRef} width={width} height={height} />;
};

export default CloudinaryPlayer;



