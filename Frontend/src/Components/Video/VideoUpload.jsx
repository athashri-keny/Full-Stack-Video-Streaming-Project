import React , {useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Input from '../input'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import SideNav from '../SideNav/SideNav'
import { useSelector } from 'react-redux'

function VideoUpload() {
const [error , SetError] = useState("")
const {register , handleSubmit} = useForm()
const [loading , setLoading] = useState(false)
const Navigate = useNavigate()
const darkMode = useSelector((state) => state.theme.DarkMode)
const API_BASE  = import.meta.env.VITE_API_URL;


const upload = async (data) => {
    SetError("")
console.log("Upload Data = "  , data )
console.log("Video File" , data?.VideoFile?.[0])
console.log("thumbnail" , data?.thumbnail?.[0])


const formdata = new FormData()
formdata.append("title" , data.title)
formdata.append("description" , data.description)
formdata.append("VideoFile" , data.VideoFile?.[0])
formdata.append("thumbnail" , data.thumbnail?.[0])
setLoading(true)

if (!data?.VideoFile?.[0]) {
    console.log("Video file is not detecting")
}

if (!FormData) {
    console.log("formdata is missing")
}

const response = await axios.post(`${API_BASE}/api/v1/videos/upload` , formdata, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
   },
  withCredentials: true
})

if (response.data.data) {
    Navigate("/")
    console.log("Video Uploaded sucessfully!!!!")
    setLoading(false)
}


}

 return (
  <div className="min-h-screen flex">
    <div className="w-60 fixed left-0 top-0 h-full bg-gray-800 shadow-lg">
      <SideNav />
    </div>
    <div
      className={`flex-1 flex justify-center items-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-lg p-8 rounded-xl shadow-lg transition-all duration-500 transform ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 
        text-white " >
          Upload Video
          <span className="ml-2 animate-pulse">📤</span>
        </h2>
        <form onSubmit={handleSubmit(upload)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter video title"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 transition-all duration-300 
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400"
              {...register("title", { required: true })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              placeholder="Enter video description"
              rows="4"
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 transition-all duration-300 
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400"
              {...register("description", { required: true })}
            />
          </div>

          {/* File Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Video File */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Video File
              </label>
              <input
                type="file"
                accept="video/*"
                className="w-full cursor-pointer rounded-lg border px-4 py-2 
                  bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 
                  hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-300  "
                {...register("VideoFile", { required: true })}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full cursor-pointer rounded-lg border px-4 py-2 
                  bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 
                  hover:bg-green-100 dark:hover:bg-green-800 transition-all duration-300"
                {...register("thumbnail", { required: true })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 
                dark:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-lg 
                hover:shadow-xl transform hover:scale-105 focus:ring-4 focus:ring-blue-300/50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Uploading...
                </span>
              ) : (
                "Upload Video"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default VideoUpload