import React, { useState } from "react";
import Input from '../Components/input'
import {Link ,  useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash  } from '@fortawesome/free-solid-svg-icons'
import  {faEye} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const SignUp = () => {
const Navigate = useNavigate()
const [error , seterror] = useState('')
const {register , handleSubmit} = useForm()
const [showPassword , setShowPassword] = useState(false)
  const darkMode = useSelector((state) => state.theme.DarkMode);
  const [message , setmessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const API_BASE  = import.meta.env.VITE_API_URL;

const Create = async (data) => {
  seterror("");
  setIsLoading(true)
  // Log files specifically

  
  try {
    const formdata = new FormData();
    formdata.append("fullname", data.fullname);
    formdata.append("email", data.email);
    formdata.append("username", data.username);
    formdata.append("password", data.password);

    // Check for files explicitly
    if (data.avatar?.[0]) {
      formdata.append('avatar', data.avatar[0]);
    } else {
      console.error("Avatar file is missing");
      seterror("Avatar is required");
      setIsLoading(false)
      return;
    }

    if (data.coverImage?.[0]) {
      formdata.append('coverImage', data.coverImage[0]);
    }

    const response = await axios.post(`${API_BASE}/api/v1/users/register`, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.data) {
      setmessage("Account Created Successfully!! Redirecting to Login...");
      setTimeout(() => {
        Navigate('/login');
      }, 4000); // 2000ms = 2 seconds delay
    }
       } catch (error) {
    const errorMsg = error.response?.data?.message || 'Something went wrong';
    seterror(errorMsg);
    console.error('Signup error:', errorMsg);
  }
};

return (
  <div
    className={`min-h-screen flex justify-center pt-10 bg-gradient-to-br ${
      darkMode
        ? "from-gray-900 via-gray-800 to-gray-900"
        : "from-gray-100 via-gray-50 to-gray-100"
    }`}
  >
    <div
      className={`w-full max-w-md p-10 rounded-3xl shadow-2xl transform transition-all duration-500 animate-fade-in-up ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-4xl font-bold text-center bg-clip-text mb-8 animate-text-glow ${
          darkMode
            ? "text-transparent bg-gradient-to-r from-green-400 to-blue-400"
            : "text-transparent bg-gradient-to-r from-green-600 to-blue-600"
        }`}
      >
        Sign Up
      </h2>

      {error && (
        <p
          className={`text-center mb-6 animate-pulse ${
            darkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}

      {message && (
        <p
          className={`text-center mb-6 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(Create)} className="space-y-6">
        {/* Full Name */}
        <div className="animate-slide-in-left">
          <label
            className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-green-400"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Full Name
          </label>
          <Input
            type="text"
            id="fullname"
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 ${
              darkMode
                ? "bg-gray-700 text-black-100 border-gray-600 focus:ring-green-400/30 focus:border-green-400"
                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-green-500/30 focus:border-green-500"
            }`}
            placeholder="Enter your full name"
            {...register("fullname", { required: "Full name is required" })}
          />
        </div>

        {/* Email */}
        <div className="animate-slide-in-right">
          <label
            className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-green-400"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 ${
              darkMode
                ? "bg-gray-700 text-black-100 border-gray-600 focus:ring-green-400/30 focus:border-green-400"
                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-green-500/30 focus:border-green-500"
            }`}
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
        </div>

        {/* Username */}
        <div className="animate-slide-in-left">
          <label
            className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-green-400"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 ${
              darkMode
                ? "bg-gray-700 text-black-100 border-gray-600 focus:ring-green-400/30 focus:border-green-400"
                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-green-500/30 focus:border-green-500"
            }`}
            placeholder="Choose a username"
            {...register("username", { required: "Username is required" })}
          />
        </div>

        {/* Password */}
        <div className="animate-slide-in-right">
          <label
            className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-green-400"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Password
          </label>
          <div className="relative group">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 pr-12 ${
                darkMode
                  ? "bg-gray-700 text-black-100 border-gray-600 focus:ring-green-400/30 focus:border-green-400"
                  : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-green-500/30 focus:border-green-500"
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 animate-bounce-in ${
                darkMode
                  ? "text-gray-400 hover:text-green-400"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="animate-slide-in-left">
          <label
            className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-green-400"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Avatar
          </label>
          <Input
            type="file"
            id="avatar"
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 ${
              darkMode
                ? "bg-gray-700 text-black-100 border-gray-600 file:text-gray-100 file:bg-gray-600"
                : "bg-gray-50 text-gray-900 border-gray-300 file:text-gray-900 file:bg-gray-200"
            }`}
            {...register("avatar", { required: "Avatar is required" })}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="animate-slide-in-right">
          <label
            className={`block text-sm font-medium mb-2 transition-all duration-300 ${
              darkMode
                ? "text-gray-300 hover:text-green-400"
                : "text-gray-600 hover:text-green-600"
            }`}
          >
            Cover Image
          </label>
          <Input
            type="file"
            id="coverImage"
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 ${
              darkMode
                ? "bg-gray-700 text-white-100 border-gray-600 file:text-gray-100 file:bg-gray-600"
                : "bg-gray-50 text-gray-900 border-gray-300 file:text-gray-900 file:bg-gray-200"
            }`}
            {...register("coverImage")}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
            darkMode
              ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              : "bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500"
          }`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      {message && (
  <p 
  className={`text-center mb-6 transition-all duration-500 ${
    darkMode 
      ? "text-green-400 bg-green-900/30" 
      : "text-green-600 bg-green-100"
  } px-4 py-3 rounded-lg inline-flex items-center gap-2 animate-fade-in-up`}
>
  <FontAwesomeIcon 
    icon={faCircleCheck} 
    className={`${darkMode ? "text-green-300" : "text-green-500"} bounce`} 
  />
  <span className="animate-text-glow">{message}</span>
</p>
)}

      <p
        className={`mt-8 text-sm text-center animate-fade-in ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          className={`transition-all duration-300 hover:underline underline-offset-4 decoration-2 ${
            darkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-500"
          }`}
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
};