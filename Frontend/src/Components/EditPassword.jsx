import React , {useState , useEffect}  from 'react'
import axios from 'axios'
import Button from './Button'
import Input from './input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash  } from '@fortawesome/free-solid-svg-icons'
import  {faEye} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';


function EditProfile() {
const [oldPassword , SetOldPassword] = useState('')
const [Newpassword , SetNewPassword] = useState('')
const [showPassword  , setShowPassword] = useState(false)
const [ShowNewPassword  , setShowNewPassword] = useState(false)
const [message , setMessage] = useState('')
const darkMode = useSelector((state) => state.theme.DarkMode);

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



return  (
  <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
    darkMode 
      ? 'from-gray-900 via-gray-800 to-gray-900' 
      : 'from-gray-100 via-gray-50 to-gray-100'
  }`}>
    <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl transform transition-all duration-500 animate-fade-in-up ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-3xl font-bold text-center bg-clip-text mb-8 animate-text-glow ${
        darkMode 
          ? 'text-transparent bg-gradient-to-r from-blue-400 to-green-400' 
          : 'text-transparent bg-gradient-to-r from-blue-600 to-green-600'
      }`}>
        Change Password
      </h2>
      
      <form onSubmit={UpdatePass} className="space-y-6">
        {/* Old Password Field */}
        <div className="animate-slide-in-left">
          <label className={`block text-sm font-medium mb-2 transition-all duration-300 ${
            darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
          }`}>
            Old Password
          </label>
          <div className="relative group">
            <Input 
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => SetOldPassword(e.target.value)}
              placeholder="Current password"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-blue-400 pr-12 ${
                darkMode 
                  ? 'bg-gray-700 text-black-100 border-gray-600 focus:ring-blue-400/30 focus:border-blue-400' 
                  : 'bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500/30 focus:border-blue-500'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 animate-bounce-in ${
                darkMode ? 'text-black-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div className="animate-slide-in-right">
          <label className={`block text-sm font-medium mb-2 transition-all duration-300 ${
            darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-600'
          }`}>
            New Password
          </label>
          <div className="relative group">
            <Input
              type={ShowNewPassword ? "text" : "password"}
              id="newPassword"
              value={Newpassword}
              onChange={(e) => {
                SetNewPassword(e.target.value);
                setMessage('');
              }}
              placeholder="New password"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all duration-300 group-hover:border-green-400 pr-12 ${
                darkMode 
                  ? 'bg-gray-700 text-black-100 border-gray-600 focus:ring-green-400/30 focus:border-green-400' 
                  : 'bg-gray-50 text-gray-900 border-gray-300 focus:ring-green-500/30 focus:border-green-500'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!ShowNewPassword)}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 animate-bounce-in ${
                darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <FontAwesomeIcon icon={ShowNewPassword ? faEye : faEyeSlash} className="w-5 h-5" />
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
          Update Password
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center text-sm animate-fade-in ${
          message.includes("Success") 
            ? (darkMode ? 'text-green-400' : 'text-green-600') 
            : (darkMode ? 'text-red-400' : 'text-red-600')
        }`}>
          {message}
        </p>
      )}
    </div>
  </div>
);
}

export default EditProfile