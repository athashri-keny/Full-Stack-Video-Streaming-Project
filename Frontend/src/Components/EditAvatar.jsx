import React, { useRef, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import Input from './input'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function EditAvatar() {
const [error , seterror] = useState(false)
const [avatarUpdated , setavatarUpdated] = useState(false)
const Navigate = useNavigate()
const FileInputRef = useRef(null)
const darkMode = useSelector((state) => state.theme.darkMode);
const API_BASE  = import.meta.env.VITE_API_URL;

const updateAvatar = async () => {
  // Clear any previous errors
  seterror('');
  // Get the file from the file input
  const File = FileInputRef.current?.files?.[0] // using ref because it does not cause rendering  
  console.log(File)


  if (!File) {
    console.error("Avatar file is missing");
    seterror("Avatar is required");
    return;
  }
  setavatarUpdated(!avatarUpdated)
 
  // Create a FormData object and append the file
  const formdata = new FormData();
  formdata.append('avatar', File);
  
  try {
    const response = await axios.patch(`${API_BASE}/api/v1/users/avatar`, formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    // Check if the response contains the updated avatar
    if (response.data.avatar) {
      console.log("Avatar updated successfully");
      Navigate(0)      
       // reload the page to show changes
      // Optionally, update state or do further processing here
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Error uploading avatar";
    console.error(errorMsg);
    seterror(errorMsg);
  }
};

// refs are used to  programmatically trigger the hidden file  input click event
return (
  <div>
    <div className="relative group">
      <Button
        onClick={() => FileInputRef.current && FileInputRef.current.click()}
        className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 ${
          darkMode
            ? 'bg-gradient-to-br from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
            : 'bg-gradient-to-br from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500'
        }`}
      >
        <FontAwesomeIcon 
          icon={faPen} 
          className={`w-4 h-4 ${darkMode ? 'text-gray-100' : 'text-white'}`}
        />
      </Button>
      <Input
        ref={FileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={updateAvatar}
      />
    </div>
    {error && (
      <p className={`mt-2 text-sm text-center animate-pulse ${
        darkMode ? 'text-red-400' : 'text-red-600'
      }`}>
        {error}
      </p>
    )}
    {avatarUpdated && (
      <p className={`mt-2 text-sm text-center animate-fade-in ${
        darkMode ? 'text-green-400' : 'text-green-600'
      }`}>
        Avatar updated successfully!
      </p>
    )}
  </div>
);
}

export default EditAvatar

