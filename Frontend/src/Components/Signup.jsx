import React, { useState } from "react";
import Input from '../Components/input'
import Button from "./Button";
import {Link ,  useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import  { login } from '../Store/authslice'

export const SignUp = () => {
const Navigate = useNavigate()
const [error , seterror] = useState('')
const dispatch = useDispatch()
const {register , handleSubmit} = useForm()


const Create = async (data) => {
  seterror("");
  console.log('Signup data ', data);
  // Log files specifically
  console.log('Avatar file:', data.avatar?.[0]);
  console.log('CoverImage file:', data.coverImage?.[0]);

  try {
    const formdata = new FormData();
    formdata.append("fullname", data.fullname);
    formdata.append("email", data.email);
    formdata.append("username", data.username);
    formdata.append("password", data.password);

    // Check for files explicitly
    if (data.avatar?.[0]) {
      formdata.append('avatar', data.avatar[0]);
      console.log(data.avatar[0])
    } else {
      console.error("Avatar file is missing");
      seterror("Avatar is required");
      return;
    }

    if (data.coverImage?.[0]) {
      formdata.append('coverImage', data.coverImage[0]);
      console.log(data.coverImage[0])
    }

    const response = await axios.post("/api/users/register", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Ensure response structure matches backend
    if (response.data.data) { // Access createdUser via response.data.data
      Navigate('/login');
      dispatch(login(response.data.data));
      console.log(response  , "user creating successfully")
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Something went wrong';
    seterror(errorMsg);
    console.error('Signup error:', errorMsg);
  }
};
return (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-black-100 mb-4">
        Sign Up
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit(Create)}> // 
        {/* Full Name */}
        <div>
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="fullname"
          >
            Full Name
          </label>
          <Input
            type="text"
            id="fullname"
            className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your full name"
            {...register("fullname", { required: "Full name is required" })}
          />
          {error.fullname && (
            <p className="text-red-500 text-sm">{error.fullname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {error.email && (
            <p className="text-red-500 text-sm">{error.email.message}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="username"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Choose a username"
            {...register("username", { required: "Username is required" })}
          />
          {error.username && (
            <p className="text-red-500 text-sm">{error.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            className="block text-sm font-medium text-gray-400 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password.message}</p>
          )}
        </div>

        {/* Avatar Upload */}
        <div>
          <label
            className="block text-sm font-medium text-black-400 mb-1"
            htmlFor="avatar"
          >
            Avatar
          </label>
          <Input
            type="file"
            id="avatar"
            className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            {...register("avatar", { required: "Avatar is required" })}
          />
          {error.avatar && (
            <p className="text-red-500 text-sm">{error.avatar.message}</p>
          )}
        </div>

        {/* Cover Image Upload */}
        <div>
          <label
            className="block text-sm font-medium text-black-400 mb-1"
            htmlFor="coverImage"
          >
            Cover Image
          </label>
          <Input
            type="file"
            id="coverImage"
            className="w-full px-4 py-2 bg-gray-800 text-black-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            {...register("coverImage", { required: "Cover image is required" })}
          />
          {error.coverImage && (
            <p className="text-red-500 text-sm">{error.coverImage.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
  type="submit"
  bgcolor="bg-green-600"
  textcolor="text-white"
  classname="hover:bg-green-700 transition duration-200"
>
  Submit
</Button>

      </form>
      <p className="mt-4 text-sm text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-500 hover:underline focus:outline-none"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
};