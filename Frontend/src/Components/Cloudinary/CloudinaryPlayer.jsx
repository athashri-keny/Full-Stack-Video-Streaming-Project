import React, { useEffect, useRef } from 'react';

const CloudinaryPlayer = ({ publicId, width, height }) => {
  const cloudinaryRef = useRef();
  const videoRef = useRef();
  const playerRef = useRef();

  useEffect(() => {
    let checkInterval;
    
    const initializePlayer = () => {
      if (videoRef.current && !playerRef.current) {
        // Initialize the player without relying on data attributes
        playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
          cloud_name: "carti",
          autoplay: true,
          muted: true,
          controls: true,
        });
        // Set the initial source using the publicId prop
        playerRef.current.source({ publicId, cloudName: "carti" });
      }
    };

    // Load Cloudinary script if not present
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/cloudinary-video-player@2.3.1/dist/cld-video-player.min.js";
      script.async = true;
      document.body.appendChild(script);

      checkInterval = setInterval(() => {
        if (window.cloudinary) {
          cloudinaryRef.current = window.cloudinary;
          initializePlayer();
          clearInterval(checkInterval);
        }
      }, 100);
    } else {
      cloudinaryRef.current = window.cloudinary;
      initializePlayer();
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  // Update source whenever publicId changes
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.source({ publicId, cloudName: "carti" });
    }
  }, [publicId]);

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
    />
  );
};

export default CloudinaryPlayer;
// import { useEffect, useRef } from 'react';

// const CloudinaryPlayer = ({ publicId, width, height }) => {
//   const videoRef = useRef();
//   const playerRef = useRef();

//   useEffect(() => {
//     // Initialize or update the player when publicId changes
//     const initializePlayer = () => {
//       if (!videoRef.current) return;

//       // Dispose existing player if it exists
//       if (playerRef.current) {
//         playerRef.current.dispose();
//       }

//       // Create new player instance
//       playerRef.current = window.cloudinary?.videoPlayer(videoRef.current, {
//         cloud_name: "carti",
//         autoplay: true,
//         muted: true,
//         controls: true,
//       });
//     };

//     if (window.cloudinary) {
//       initializePlayer();
//     } else {
//       // Load the Cloudinary script if not already loaded
//       const script = document.createElement('script');
//       script.src = "https://cdn.jsdelivr.net/npm/cloudinary-video-player@2.3.1/dist/cld-video-player.min.js";
//       script.async = true;
//       script.onload = initializePlayer;
//       document.body.appendChild(script);
//     }

//     // Cleanup on unmount or when publicId changes
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [publicId]); // Re-initialize when publicId changes

//   return (
//     <video
//       ref={videoRef}
//       data-cld-public-id={publicId}
//       width={width}
//       height={height}
//     />
//   );
// };

// export default CloudinaryPlayer;