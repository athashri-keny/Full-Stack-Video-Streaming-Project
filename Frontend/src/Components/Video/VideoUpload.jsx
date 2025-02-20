import React , {useState} from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Input from '../input'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'


function VideoUpload() {
const [error , SetError] = useState("")
const {register , handleSubmit} = useForm()
const [loading , setLoading] = useState(false)
const Navigate = useNavigate()


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

const response = await axios.post('/api/videos/upload' , formdata, {
    headers: {"Content-Type": "multipart/form-data"}
})

if (response.data.data) {
    Navigate("/")
    console.log("Video Uploaded sucessfully!!!!")
    setLoading(false)
}


}
  return (
    <div className="flex justify-center items-center min-h-screen bg-black-100">
    <div className="w-full max-w-md bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Video</h2>
      <form onSubmit={handleSubmit(upload)}>
        {/* Title Field */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter video title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            {...register("title" , {required: true})}
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter video description"
            rows="4"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            {...register("description" , {required: true})}
          ></textarea>
        </div>

        {/* Video File Field */}
        <div className="mb-4">
          <label
            htmlFor="video"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Video File
          </label>
          <Input
            type="file"
            id="video"
            name="VideoFile"
            accept = "video/*"
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                       file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
                       {...register("VideoFile" ,  {required: true} )}
          />
        </div>

        {/* Thumbnail Field */}
        <div className="mb-6">
          <label
            htmlFor="thumbnail"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Thumbnail
          </label>
          <Input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept = "thumbnail/*"
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                       file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                       hover:file:bg-green-100"
                       {...register("thumbnail" , {required: true})}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Video
          </Button>
        </div>
        {loading ? <h1>Uploading Video</h1> : null}
      </form>
    </div>
  </div>

  )
}

export default VideoUpload