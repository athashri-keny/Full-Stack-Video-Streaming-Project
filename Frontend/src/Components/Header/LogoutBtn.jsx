import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logout } from '../../Store/authslice'
import { useNavigate } from 'react-router-dom'


function Logout() {
 const dispatch = useDispatch()
const Navigate = useNavigate()
 const LogoutHandler = () => {

    axios.post('/api/users/logout' , {}  , {withCredentials: true})
    .then(() => {
        dispatch(logout())
        Navigate('/')
          })
 }
  return (
    <button
    className="inline-block px-6 py-2 bg-blue-500 text-white duration-200 hover:bg-blue-600 rounded-full"
    onClick={LogoutHandler}
  >
    Logout
  </button>
  
  )
}

export default Logout