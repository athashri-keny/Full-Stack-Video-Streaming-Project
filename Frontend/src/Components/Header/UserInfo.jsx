import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../Button.jsx'
import Logout from './LogoutBtn.jsx'

function UserInfo() {
 const [userdata , setUserdata] = useState(null)
 const [loading , setLoading] = useState(null)

useEffect(() => {
    axios.get('api/users/current-user' , {withCredentials: true})
    .then((response) => {
   //     const Avatar = response.data.avatar
   //   const CoverImage = response.data.coverImage
    setUserdata(response.data.data)
    setLoading(false)
    })
} ,[])
if (loading) {
    return <div>Loading...</div>
}
if (!userdata) {
    return <div> No userData found</div>
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
        </div>
  
        {/* Avatar */}
        <div className="flex justify-center -mt-16"> {/* Adjusted margin-top */}
          <div className="relative w-32 h-32 rounded-full border-4 border-black shadow-lg bg-black overflow-hidden">
            <img
              src={userdata.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
  
        {/* User Info */}
        <div className="text-center mt-6 text-white">
          <h2 className="text-2xl font-bold">{userdata.fullname}</h2> {/* Larger and bolder name */}
          <p className="text-gray-400 mt-2">{userdata.email}</p>
          <p className="text-gray-300 mt-1">@{userdata.username}</p> {/* Added "@" for username */}
        </div>
  
        {/* Logout Button */}
        <div className="flex justify-center mt-8"> {/* Increased margin-top */}
          <Logout />
        </div>
      </div>
    </div>
  );
}  

export default UserInfo