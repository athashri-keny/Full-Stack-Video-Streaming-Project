// VideoPlayerPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CloudinaryPlayer from '../Components/Cloudinary/CloudinaryPlayer';
import Input from '../Components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Addcomment from '../Components/Comments/Addcomments';
import EditComments from '../Components/Comments/EditComments';
import ChannelInfo from '../Components/Channel/ChannelInfo'
import AddVideoToPlaylist from '../Components/Playlist/AddVideoToPlaylist';

const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [publicId, setPublicId] = useState('');
  const [channel, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);
  const [ownerComment, setOwnerComment] = useState(null);
  const [notification, setNotification] = useState("");
  const { VideoId , ChannelId} = useParams();
  const navigate = useNavigate();
  const [activeComEdit, setActiveComEdit] = useState(null);
const [channelSubButton , setChannelSubButton] = useState(false)
  const [subscribeChannel , setsubscribeChannel] = useState("")
  const [channelInfo , setChannelInfo] = useState("")



  useEffect(() => { 
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/api/videos/c/${VideoId}/c/${ChannelId}`);
        setVideo(response.data.data.video);
        setPublicId(response.data.data.video.VideoCloudinaryPublicId);
        setComments(response.data.data.Comments);
        setChannelData(response.data.data.channel);
        setOwnerComment(response.data.data.Userr);
        setsubscribeChannel(response.data.data.channel._id)
        console.log(response.data.data.channel._id);
        console.log(response)
      } catch (error) {
        console.error('Error fetching video:', error);
        navigate('/');
      }
    };
    fetchVideoData();
  }, [VideoId, navigate]);

  // Like function
  const fetchLike = async () => {
    try {
      await axios.get(`/api/likes/c/${VideoId}`);
      console.log("Video Liked Successfully");
      setNotification("Video Liked Successfully!");
      setTimeout(() => {
        setNotification(""); // Remove the notification after 3 seconds
      }, 3000);
    } catch (error) {
      console.log("Error while liking", error);
    }
  };

  // Toggle the Manage Comment dropdown for a comment
  const toggleManageComment = (index) => {
    if (activeComEdit === index) {
      setActiveComEdit(null);
    } else {
      setActiveComEdit(index);
    }
  };


  // subscribe
 const HandleSubscribe =  async () => {
  try {
    if (!channelSubButton) {
       await axios.post(`/api/subs/substochannel/c/${ChannelId}`);
       setChannelSubButton(true);
    } else {
       await axios.post(`/api/subs/substochannel/c/${ChannelId}`);
      setChannelSubButton(false);
    }
  } catch (error) {
    console.error("Sub failed")
  }
 }

 const handleChannelRedirect = () => {
  navigate(`/channelInfo/c/${channel._id}`);
};


 

  if (!publicId) return <div>Loading video...</div>;

  return (
   
    <div className="max-w-full mx-auto p-4">
    {/* Video Player Container */}
    <div className="relative w-full max-w-3xl mx-auto aspect-video"> {/* Adjust max-w-3xl to your preferred size */}
      <CloudinaryPlayer
        key={publicId}
        publicId={publicId}
        width="1550"
        height="720"
        className="w-full h-full rounded-lg shadow-lg"
      />
    </div>

  
    <div className="flex items-center justify-between mt-4">
      <h1 className="text-2xl font-bold transition-colors duration-300 hover:text-blue-600">
        {video?.title || 'Video Title'}
      </h1>
      <div className="flex space-x-3">
        {notification && <p className="text-gray-600">{notification}</p>}
        <button onClick={fetchLike} className="text-gray-600 hover:text-blue-600 text-3xl transition-transform transform hover:scale-110">
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <button className="text-gray-600 hover:text-blue-600 text-3xl transition-transform transform hover:scale-110">
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    </div>
  
    {/* Channel Details */}
    {channel && (
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-3">
            <img src={channel.avatar} alt="Channel Avatar" className="w-12 h-12 rounded-full object-cover shadow-md transition-transform transform hover:scale-110" />
          <div>
            <p className="font-medium text-lg">{channel.username || 'Channel Name'}</p>
            <p className="text-sm text-gray-500">Subscribers {channel.subscribersCount}</p>
          </div>
        </div>
        <button onClick={handleChannelRedirect} className="text-blue-600 hover:underline transition duration-300">
              View Channel
          </button>
          <Link to={`/channelInfo/c/${channel._id}`}></Link>
        {channelSubButton === false ? (
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105">
            Subscribe
          </button>
        ) : (
          channelSubButton === true && (
            <button onClick={HandleSubscribe} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105">
              Subscribed
            </button>
          )
        )}
        <AddVideoToPlaylist/>
      </div>
    )}
  
    {/* Video Description */}
    <div className="bg-gray-100 p-4 rounded-lg mt-4 shadow-md transition-transform transform hover:scale-105">
      <p className="text-gray-700">{video?.description || 'This is the video description.'}</p>
    </div>
  
    {/* Comments Section */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Comments</h2>
      <Addcomment />
      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={comment._id} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow ">
              <div className="w-10 h-10">
                <img
                  src={ownerComment?.avatar}
                  alt={ownerComment?.username}
                  className="w-full h-full object-cover rounded-full shadow-md transition-transform transform hover:scale-110"
                />
              </div>
              <div>
                <p className="font-medium">{ownerComment?.username}</p>
                <p className="text-gray-700">{comment.content || 'This is a comment on the video.'}</p>
              </div>
              <div className="ml-auto relative">
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  onClick={() => toggleManageComment(index)}
                  className="cursor-pointer transition-transform transform hover:scale-110"
                />
                {activeComEdit === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                    <Link
                      to={`/Comments/update/c/${VideoId}/c/${comment._id}`}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300"
                    >
                      Manage Comment
                    </Link>
                  </div>
                )}
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
};

export default VideoPlayerPage;
