import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Header/LogoutBtn';
import { useNavigate } from 'react-router-dom';
import EditAvatar from './EditAvatar';
import EditCoverImage from './EditCoverImage';


function UserInfo() {
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate()

  useEffect(() => {
    axios.get('api/users/current-user', { withCredentials: true })
      .then((response) => {
        setUserdata(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  const handleUpdatePassword = () => {
    // Add your logic for updating the password here
       Navigate('/EditProfile')
       console.log("Button was clicked")
       Navigate(0)
    // You can redirect to a password update page or show a modal
  };

  const HandleUpdateDetails = () => {
    Navigate("/EditNAME")
    console.log("button was clicked")
    Navigate(0)
  }
   
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userdata) {
    return <div>No userData found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="max-w-2xl w-full mx-auto p-6 bg-black shadow-lg rounded-2xl">
        {/* Cover Image */}
        <div className="relative h-72 w-full bg-blue-900 rounded-t-2xl overflow-hidden">
          <img
            src={userdata.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <EditCoverImage/>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-16">
        
        <div className="relative w-32 h-32 rounded-full border-4 border-black shadow-lg bg-black overflow-hidden">
  <img
    src={userdata.avatar}
    alt="User Avatar"
    className="w-full h-full object-cover"
  />
   <EditAvatar/>
          </div>
        </div>
       
        {/* User Info */}
        <div className="text-center mt-6 text-white">
          <h2 className="text-2xl font-bold">{userdata.fullname}</h2>
          <p className="text-gray-400 mt-2">{userdata.email}</p>
          <p className="text-gray-300 mt-1">@{userdata.username}</p>
        </div>
        
        <button  
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         onClick={() => {HandleUpdateDetails()}}> Update account Details</button>
        

        {/* Update Password Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleUpdatePassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Password
          </button>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-4">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;