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
import { useSelector } from 'react-redux';



export const Login = () => {
const [error , SetError] = useState('')
const {register , handleSubmit} = useForm()
const dispatch = useDispatch()
const Navigate = useNavigate()
const [showPassword , setShowPassword] = useState(false)
  const darkMode = useSelector((state) => state.theme.DarkMode);
const API_BASE  = import.meta.env.VITE_API_URL;

const login = async (data ) => {
  SetError(''); // Reset error state
  
  try {
    const response = await axios.post(`${API_BASE}/api/users/login`, data ,  {withCredentials: true}) ;

    if (response.data) { 
        dispatch(LoginAction(response.data.data));
      if (response.data) {
        console.log('login in sucessfull' , response)
        Navigate('/')
      }
    }
  } catch (error) {
    SetError( error.message);
  }
   // getting the current user details
 
};

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
      darkMode 
        ? 'from-gray-900 via-gray-800 to-gray-900' 
        : 'from-gray-100 via-gray-50 to-gray-100'
    }`}>
      <div className={`w-full max-w-md p-10 rounded-3xl shadow-2xl transform transition-all duration-500 animate-fade-in-up ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-4xl font-bold text-center bg-clip-text mb-8 animate-text-glow ${
          darkMode 
            ? 'text-transparent bg-gradient-to-r from-blue-400 to-green-400' 
            : 'text-transparent bg-gradient-to-r from-blue-600 to-green-600'
        }`}>
          Login
        </h2>

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="animate-slide-in-left">
            <label className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            }`}>
              Email
            </label>
            <div className="relative group">
              <Input
                type="email"
                id="email"
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-blue-400 ${
                  darkMode 
                    ? 'bg-gray-700 text-black-100 border-gray-600 focus:ring-blue-400/30 focus:border-blue-400' 
                    : 'bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500/30 focus:border-blue-500'
                }`}
                placeholder="Enter your email"
                {...register('email', { required: true })}
              />
              {error && (
                <p className={`text-sm mt-2 animate-pulse ${
                  darkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="animate-slide-in-right">
            <label className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            }`}>
              Password
            </label>
            <div className="relative group">
              <Input 
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-blue-400 pr-12 ${
                  darkMode 
                    ? 'bg-gray-700 text-black-100 border-gray-600 focus:ring-blue-400/30 focus:border-blue-400' 
                    : 'bg-gray-50 text-black-900 border-gray-300 focus:ring-blue-500/30 focus:border-blue-500'
                }`}
                placeholder="Enter your password"
                {...register('password', { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 animate-bounce-in ${
                  darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {showPassword ? 
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5" /> : 
                  <FontAwesomeIcon icon={faEyeSlash} className="w-5 h-5" />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600' 
                : 'bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500'
            }`}
          >
            Login
          </button>
        </form>

        <p className={`mt-8 text-sm text-center animate-fade-in ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className={`transition-all duration-300 hover:underline underline-offset-4 decoration-2 ${
              darkMode 
                ? 'text-green-400 hover:text-green-300' 
                : 'text-green-600 hover:text-green-500'
            }`}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
};