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

  
  const EditComm = async () => {
    try {
      await axios.patch(
        `/api/comments/update/c/${VideoId}`,
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
      await axios.delete(`/api/comments/delete/c/${VideoId}`, {
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
  

  return (
    <div className="p-4">
      <div className="flex justify-end relative mb-4">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          onClick={() => toggleManageComment(comment._id)}
          className="cursor-pointer transition-transform transform hover:scale-110 text-gray-600"
        />
        {activeComEdit === comment._id && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
            <button
              onClick={() => setCommentModal(true)}
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Manage Comment
            </button>
          </div>
        )}
      </div>

      {commentModal && (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="block w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={EditComm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Update
          </button>
          <button
            onClick={DeleteComment}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default EditComments