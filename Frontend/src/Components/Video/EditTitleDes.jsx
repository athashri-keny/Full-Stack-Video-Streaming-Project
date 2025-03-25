import React, { useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';
import Input from '../input'
import { useSelector } from 'react-redux';
import SideNav from '../SideNav/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';


function EditTitleDes() {
  const { VideoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   const [message , setMessage] = useState("")
   const [DeleteMessage , SetDeleteMessage] = useState("")
   const Navigate = useNavigate()
    const darkMode = useSelector((state) => state.theme.DarkMode);
    const API_BASE  = import.meta.env.VITE_API_URL;


    const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        
        `${API_BASE}/api/v1/videos/update/c/${VideoId}`,
        {
           title : title, 
           description: description
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      console.log("Video updated successfully:", response.data);
       setMessage("Video Details Updated Sucessfullyy")
       Navigate('/')
    } catch (error) {
      console.log(error, "Error while editing video details");
    }
  };

  const HandleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/api/v1/videos/delete/c/${VideoId}`)
      console.log("Video Deleted Sucessfully")
      SetDeleteMessage("Video Deleted Sucessfully!")
      Navigate('/')
    } catch (error) {
      console.log("error while deleting the video")
    }
  }

  

  return (
  <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
  <SideNav />
  <div className="ml-48 mt-16 p-6 transition-colors duration-300">
    <div className={`rounded-lg shadow-lg p-6 max-w-lg mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Edit Video Details
        <FontAwesomeIcon icon={faEdit} className="ml-2" />
      </h2>
      
      <div className="mb-6">
        <label htmlFor="title" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new title"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500' 
              : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400'
          }`}
        />
      </div>

      <div className="mb-8">
        <label htmlFor="description" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter new description"
          rows="4"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500' 
              : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400'
          }`}
        />
      </div>

      <div className="space-y-4">
        <button
          onClick={handleUpdate}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Update
        </button>

        <button
          onClick={HandleDelete}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 ${
            darkMode 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          Delete Video 
        </button>
        {DeleteMessage}
      </div>

      {message && (
        <p className={`mt-4 text-center text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      {DeleteMessage && (
        <p className={`mt-4 text-center text-sm ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
          {DeleteMessage}
        </p>
      )}
    </div>
  </div>
</div>
  )
}

export default EditTitleDes;
