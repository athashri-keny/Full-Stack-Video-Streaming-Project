import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logout as LogoutAction } from '../../Store/authslice'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const dispatch = useDispatch()
  const API_BASE  = import.meta.env.VITE_API_URL;


  const LogoutHandler =  async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/v1/users/logout` , {withCredentials: true})
      if (response) {
        dispatch(LogoutAction())
        console.log( "logout Successfully")
      }
    } catch (error) {
      console.error("error while loggin out")
    }
  }

  return (
    <button
      onClick={LogoutHandler}
      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
    >
      Logout
    </button>
  )
}

export default Logout