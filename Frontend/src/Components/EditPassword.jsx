import React , {useState , useEffect}  from 'react'
import axios from 'axios'
import Button from './Button'
import Input from './input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash  } from '@fortawesome/free-solid-svg-icons'
import  {faEye} from '@fortawesome/free-solid-svg-icons'

function EditProfile() {
const [oldPassword , SetOldPassword] = useState('')
const [Newpassword , SetNewPassword] = useState('')
const [showPassword  , setShowPassword] = useState(false)
const [ShowNewPassword  , setShowNewPassword] = useState(false)
const [message , setMessage] = useState('')


const UpdatePass = async (e) => {
  e.preventDefault();
  try {
    // Send data as JSON
    const response = await axios.post('api/users/change-password',
      {
        oldPassword: oldPassword,
        newPassword: Newpassword // Ensure variable name matches state
      }, 
      {
        headers: {
          'Content-Type': 'application/json' // Set correct content type
        },
        withCredentials: true
      }
    );

    console.log('Response:', response.data);
    setMessage("Password Updated Successfully");
    
    // Clear form fields
    SetOldPassword('');
    SetNewPassword('');
  } catch (error) {
    console.error('Error:', error);
    setMessage(error.response?.data?.message || "An error occurred");
  }
};


return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Change Password</h2>
      <form onSubmit={UpdatePass}>
        {/* Old Password Field */}
        <div className="mb-6">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Old Password
          </label>
          <Input 
            type = {showPassword ? "text" : "password"}
            id="oldPassword"
            value= {oldPassword}
            onChange={(e) => SetOldPassword(e.target.value)}
            placeholder="Enter your current password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          /> 
          <Button onClick = {() => {
            setShowPassword(!showPassword)
          }}>
        {showPassword ? <FontAwesomeIcon icon= {faEye} /> : <FontAwesomeIcon icon= {faEyeSlash}/> }
          </Button>
        </div>

        {/* New Password Field */}
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <Input
            type= {ShowNewPassword ? "text" : "password"}
            id="newPassword"
            value= {Newpassword}
            onChange={(e) => {
              SetNewPassword(e.target.value);
              setMessage('');  // Clear error when user types
            }}
            placeholder="Enter your new password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <Button onClick = {() => {setShowNewPassword(!ShowNewPassword)}}>
            {ShowNewPassword ? <FontAwesomeIcon icon= {faEye} /> :  <FontAwesomeIcon icon= {faEyeSlash}/> }
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Update Password
        </Button>
      </form>

      {/* Message Display */}
      {message && (
        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  </div>
);
}

export default EditProfile