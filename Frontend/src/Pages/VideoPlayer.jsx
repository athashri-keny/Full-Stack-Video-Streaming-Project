// VideoPlayerPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import CloudinaryPlayer from '../Components/Cloudinary/CloudinaryPlayer';
import Input from '../Components/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Addcomment from '../Components/Comments/Addcomments';

const VideoPlayerPage = () => {
  const [video, setVideo] = useState(null);
  const [publicId, setPublicId] = useState('');
  const [channel , setChannelData] = useState([])
  const [comments , setComments] = useState("")
  const [OwnerComment , setOwnerComment] = useState("")
  const [notification , setNotification] = useState("")
  const { VideoId } = useParams();
  const navigate = useNavigate();


  useEffect(() => { 
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/api/videos/c/${VideoId}`);
        setVideo(response.data.data.video);

        setPublicId(response.data.data.video.VideoCloudinaryPublicId);

        setComments(response.data.data.Comments) 

        setChannelData(response.data.data.channel)

        setOwnerComment(response.data.data.Userr)

        console.log(response)
    
         } catch (error) {
        console.error('Error fetching video:', error);
        navigate('/');
      }
    };
    fetchVideoData();
  }, [VideoId, navigate ]);

  
    // Like
 
    const FetchLike = async () => {
      try {
        await axios.get(`/api/likes/c/${VideoId}`)
        console.log("Video Liked Sucessfully")
        setNotification("Video Liked Sucessfully!")
        setTimeout(()=> {
         setNotification("") // for removing the notification
        } , 3000)
      } catch (error) {
        console.log("error while liking ")
         }
    }


  if (!publicId) return <div>Loading video...</div>;


  // VideoPlayerPage.js
return  (
  <div className="max-w-4xl mx-auto p-4">
   
    {/* Video Player */}
    <CloudinaryPlayer key={publicId} publicId={publicId} width="1024" height="450" className="w-full" />

    <div className="flex items-center justify-between mt-4">
    <h1 className="text-2xl font-bold">
      {video?.title || 'Video Title'}
    </h1>
    <div className="flex space-x-3">
      {notification && (
        <p>Video Liked Sucessfully</p>
      )}
      <button onClick={() => {FetchLike()}} className="text-gray-600 hover:text-blue-600 text-3xl">
       <FontAwesomeIcon icon={faThumbsUp}/>
      </button>
      <button className="text-gray-600 hover:text-blue-600 text-3xl">
     <FontAwesomeIcon icon={faThumbsDown}/>
      </button>
    </div>
  </div>

   {/* Channel Details */}
   {channel && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <img src={channel.avatar} alt="Channel Avatar" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-medium text-lg">{channel.username || 'Channel Name'}</p>
              <p className="text-sm text-gray-500">Subscribers {channel.subscribersCount || 0} </p>
            </div>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Subscribe</button>
        </div>
      )}

    {/* Video Description */}
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <p className="text-gray-700">{video?.description || 'This is the video description.'}</p>
    </div>

    {/* Comments Section */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Comments</h2>

      <Addcomment/>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow">
             <div className="w-10 h-10">
          <img
            src={OwnerComment.avatar}
            alt={OwnerComment.username}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
              <div>
                <p className="font-medium">{OwnerComment.username}</p>
                <p className="text-gray-700">{comment.content || 'This is a comment on the video.'}</p>
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

}
export default VideoPlayerPage;