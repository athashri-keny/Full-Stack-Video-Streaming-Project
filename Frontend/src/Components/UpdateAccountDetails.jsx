import React , {useState} from 'react'
import axios from 'axios'
import Input from './input'


function UpdateAccountDetails() {
const [fullname ,  setFullname] = useState("")
const [NewEmail , setNewEmail] = useState("")
const [Error , setError] = useState(null)

const UpdateDetails = async () => {
    setError("")

    const data = {
        email: NewEmail,
       fullname: fullname
    }

    const response = await axios.patch('/api/users/update-account' , data , {
        headers: {"Content-Type" : "application/json"}
    }) 
    console.log(response)
}

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md flex flex-col space-y-4">
    <Input
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      type="email"
      id="email"
      placeholder="Enter your new email"
      onChange={(e) => setNewEmail(e.target.value)}
    />
    <Input
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      type="text"
      id="fullname"
      placeholder="Enter your new name"
      onChange={(e) => setFullname(e.target.value)}
    />
    <button
      className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      onClick={UpdateDetails}
    >
      Update Account Details
    </button>
  </div>
  
  )
  
}

export default UpdateAccountDetails