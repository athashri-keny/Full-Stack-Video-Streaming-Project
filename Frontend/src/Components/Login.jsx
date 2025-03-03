import React, { useState } from 'react';
import Input from '../Components/input'
import Button from '../Components/Button'
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login as LoginAction } from '../Store/authslice';
import { useDispatch } from 'react-redux';
import { faEyeSlash  } from '@fortawesome/free-solid-svg-icons'
import  {faEye} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie'



const accessToken = Cookies.get('accessToken');
const refreshToken = Cookies.get("refreshToken")



export const Login = () => {
const [error , SetError] = useState('')
const {register , handleSubmit} = useForm()
const dispatch = useDispatch()
const Navigate = useNavigate()
const [showPassword , setShowPassword] = useState(false)


const login = async (data ) => {
  SetError(''); // Reset error state
  
  try {
    const response = await axios.post('/api/users/login', data ,  {withCredentials: true}) ;

    if (response.data) {
      dispatch(LoginAction(response.data.data?.user));
      if (response.data) {
        console.log('login in sucessfull' , response.data.data?.user)
        Navigate('/')
      }
    }
  } catch (error) {
    SetError(error.response?.data?.message || error.message);
  }
   // getting the current user details
 
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-100 mb-4">Login</h2>
        <form onSubmit={handleSubmit(login)}
        className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              {...register('email' , {required: true})}
            />
            {error.email && (
            <p className="text-red-500 text-sm">{error.email.message}</p>
          )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="password">
              Password
            </label>
            <div className='relative w-full'>
            <Input 
              type= {showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10" // Added padding-right
              placeholder="Enter your password"
              {...register('password' , {required: true})}
            />
            </div>
           <Button onClick = {() => {setShowPassword(!showPassword)}}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-200"> 
            {showPassword ? <FontAwesomeIcon icon= {faEye} /> : <FontAwesomeIcon icon= {faEyeSlash}/>}
           </Button>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </Button>
        </form>
          <p className="mt-4 text-sm text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/Signup"
                  className="text-green-500 hover:underline focus:outline-none"
                >
                 SignUp
                </Link>
              </p>
      </div>
    </div>
  );
};