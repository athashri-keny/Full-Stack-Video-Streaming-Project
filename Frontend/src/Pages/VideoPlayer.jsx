// VideoPlayerPage.js
import React, { useState, useEffect ,  } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CloudinaryPlayer from '../Components/Cloudinary/CloudinaryPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Addcomment from '../Components/Comments/Addcomments';
import EditComments from '../Components/Comments/EditComments';
import { useSelector , useDispatch } from 'react-redux'
import AddVideoToPlaylist from '../Components/Playlist/AddVideoToPlaylist';


const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [publicId, setPublicId] = useState('');
  const [channel, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);
  const [ownerComment, setOwnerComment] = useState();
  const [notification, setNotification] = useState("");
  const { VideoId , ChannelId} = useParams();
  const navigate = useNavigate();
const [channelSubButton , setChannelSubButton] = useState(false)
  const [subscribeChannel , setsubscribeChannel] = useState("")
const Dispatch = useDispatch()
const darkMode = useSelector((state) => state.theme.DarkMode);
const API_BASE  = import.meta.env.VITE_API_URL;


  useEffect(() => { 
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/v1/videos/c/${VideoId}/c/${ChannelId}` , 
          {
            headers: {
             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
           }
         },       
        );
        setVideo(response.data.data.video);
        setPublicId(response.data.data.video.VideoCloudinaryPublicId);
        setComments(response.data.data.Comments);
        setChannelData(response.data.data.channel);
        setOwnerComment(response.data.data.Userr);
        setsubscribeChannel(response.data.data.channel._id)
        setChannelSubButton(response.data.data.channel.isSubscribed)
        } catch (error) {
        console.error('Error fetching video:', error);
        navigate('/');
      }
    };
    fetchVideoData();
  }, []);

  // Like function
  const fetchLike = async () => {
    try {
      await axios.get(`${API_BASE}/api/v1/likes/c/${VideoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
  
      setNotification("Video Liked Successfully!");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.log("Error while liking", error);
    }
  };
  
  // subscribe
  const HandleSubscribe = async () => {
    try {
      if (!channelSubButton) {
        await axios.post(
          `${API_BASE}/api/subs/substochannel/c/${ChannelId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        setChannelSubButton(true);
      } else {
        await axios.post(
          `${API_BASE}/api/subs/substochannel/c/${ChannelId}`,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        setChannelSubButton(false);
      }
    } catch (error) {
      console.error("Sub failed", error);
    }
  };
  

 const handleChannelRedirect = () => {
  navigate(`/channelInfo/c/${channel._id}`);
};

 

  if (!publicId) return <div>Loading video...</div>;

  return (
    <div className={`max-w-full p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Video Player Container - Reduced bottom spacing */}
      <div className="mb-3">
        <CloudinaryPlayer
          key={publicId}
          publicId={publicId}
          width="1318"
          height="620"
          className="w-full h-full rounded-lg"
        />
      </div>

      {/* Title and Actions Row - Tighter spacing */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h1 className={`text-xl font-bold truncate`}>
          {video?.title || 'Video Title'}
        </h1>
        <div className="flex items-center gap-3">
        {notification && (
  <div className="animate-pop-up">
    <p className={`text-xm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
      {notification}
    </p>
    <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
      <div 
        className="bg-blue-600 h-1 rounded-full animate-progress" 
        style={{ animationDuration: '3s' }}
      ></div>
    </div>
  </div>
)}
          <div className="flex gap-2">
            <button onClick={fetchLike} className={`text-2xl ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button className={`text-3xl ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
        </div>
      </div>


      {channel && (
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <img 
              src={channel.avatar} 
              alt="Channel Avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className={`text-xl font-medium`}>
                {channel.username}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {channel.subscibersCount
 || 0} subscribers
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleChannelRedirect}
              className={`text-xm px-2 py-1 ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-700'}`}
            >
              View Channel
            </button>
            <AddVideoToPlaylist/>
            <button 
              onClick={() => { HandleSubscribe(); }}
              className={`text-xm px-2 py-1 rounded-md ${
                channelSubButton
                  ? `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-600 hover:bg-gray-700'}`
                  : `${darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'}`
              }`}
            >
              {channelSubButton ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      )}

      {/* Description - Reduced padding and spacing */}
      <div className={`p-3 rounded-lg mb-2 text-xm ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
          {video?.description || 'This is the video description.'}
        </p>
      </div>

      {/* Comments Section - Tighter spacing */}
      <div>
        <h2 className={` mt-10 text-lg font-semibold mb-2`}>
          Comments
        </h2>
        <Addcomment />
        <div className="space-y-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div 
                key={comment._id} 
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex items-start gap-2">
                  <img
                    src={ownerComment?.avatar}
                    alt={ownerComment?.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium`}>
                      {ownerComment?.username}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {comment.content}
                    </p>
                  </div>
                  <EditComments comment={comment} />
                </div>
              </div>
            ))
          ) : (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
