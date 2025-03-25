import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams , useNavigate, } from 'react-router-dom'
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function EditComments({ comment }) {
  const [editedComment, setEditedComment] = useState(comment.content);
  const { VideoId } = useParams();
  const navigate = useNavigate();
  const [commentModal, setCommentModal] = useState(false);
  const [activeComEdit, setActiveComEdit] = useState(null);
  const API_BASE  = import.meta.env.VITE_API_URL;


  
  const EditComm = async () => {
    try {
      await axios.patch(
        `${API_BASE}/api/v1/comments/update/c/${VideoId}`,
        {
          UpdatedComment: editedComment,
          CommentId: comment._id,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      navigate(0);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const DeleteComment = async () => {
    try {
      await axios.delete(`${API_BASE}/api/v1/comments/delete/c/${VideoId}`, {
        data: { CommentId: comment._id },
        headers: { "Content-Type": "application/json" }
      });
      navigate(0);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleManageComment = (index) => {
    setActiveComEdit(activeComEdit === index ? null : index);
  };
  

  return   (
    <div className="p-4 relative">
      <div className="flex justify-end relative mb-4">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={() => toggleManageComment(comment._id)}
          className="cursor-pointer transition-all duration-200 hover:scale-110 text-gray-600 hover:text-gray-800"
        />
        {activeComEdit === comment._id && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg rounded-md z-10 
               animate-slide-down origin-top-right transition-all duration-200">
            <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45"></div>
            <button
              onClick={() => {
                setCommentModal(true);
                setActiveComEdit(null); // Close dropdown when opening modal
              }}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 
                       transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
            >
              Manage Comment
            </button>
          </div>
        )}
      </div>

      {commentModal && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center 
             animate-fade-in z-30">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 
               animate-modal-scale origin-center">
            <input
              type="text"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="block w-full p-3 mb-4 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 text-black"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCommentModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={EditComm}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         shadow-md hover:shadow-lg"
              >
                Update
              </button>
              <button
                onClick={DeleteComment}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         shadow-md hover:shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditComments