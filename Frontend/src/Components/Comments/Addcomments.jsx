import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Addcomment() {
    const {VideoId} = useParams()
      const [CommentContent , SetCommentContent] = useState("")
      const [message , setMessage] = useState("")
     const darkMode = useSelector((state) => state.theme.DarkMode)
     const Navigate = useNavigate(0)
     const API_BASE  = import.meta.env.VITE_API_URL;

      
     const handleComSubmit = async (e) => {
      SetCommentContent(e.target.value)
     }

     const AddComment = async () => {
      try {
        await axios.post(
          `${API_BASE}/api/v1/comments/Add/c/${VideoId}`,
          { Content: CommentContent },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        setMessage("Comment added successfully on this video!");
        setTimeout(() => {
          Navigate(0);
        }, 1000);
      } catch (error) {
        console.error("Error in AddComment:", error);
      }
    };
    

  return (

    <div className="flex items-center space-x-3 mb-4">
  {/* <div className="w-10 h-10 bg-gray-300 rounded-full"></div> */}
  <input 
    type="text" 
    placeholder="Add a comment..." 
    className={`flex-grow p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out ${
      darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white"
    }`}
    onChange={handleComSubmit} 
    value={CommentContent}
  />
  <button 
    onClick={AddComment} 
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
  >
    Add
  </button>
  {message && (
    <p className="text-green-600 text-sm font-medium mt-2">
      Comment added successfully on this video!
    </p>
  )}
</div>

  )
}

export default Addcomment