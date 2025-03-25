import axios from 'axios'
import React, { useState , useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'
import Button from './Button';
import Input from './input';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditCoverImage() {
    const [error , seterror] = useState(false)  
   const InputFileRef = useRef(null)
   const Navigate = useNavigate() 
   const darkMode = useSelector((state) => state.theme.darkMode);
   const [coverImageUpdated, setCoverImageUpdated] = useState(false);
   const API_BASE  = import.meta.env.VITE_API_URL;
   
    const UpdateCoverImage = async() => {
   seterror('')
   const File = InputFileRef.current?.files?.[0]
    console.log(File)

   try {
    const formdata = new FormData()
    formdata.append('coverImage' , File)

   axios.patch(`${API_BASE}api/v1/users/cover-image` , formdata , {
    headers: {"Content-Type": "multipart/form-data"}
   })

  } catch (error) {
       seterror(error)
   }
   if (File) {
    console.log("avatar updated sucessfully")
    Navigate(0)
   }
    }

  return  (
    <div>
        <div className="relative group">
            <Button
                onClick={() => InputFileRef.current?.click()}
                className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95 ${
                    darkMode
                        ? 'bg-gradient-to-br from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
                        : 'bg-gradient-to-br from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500'
                }`}
            >
                <FontAwesomeIcon 
                    icon={faPen} 
                    className={`w-4 h-4 ${darkMode ? 'text-gray-100' : 'text-white'}`}
                />
            </Button>
            <Input
                ref={InputFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={UpdateCoverImage}
            />
        </div>
        {error && (
            <p className={`mt-2 text-sm text-center animate-pulse ${
                darkMode ? 'text-red-400' : 'text-red-600'
            }`}>
                {error}
            </p>
        )}
        {coverImageUpdated && (
            <p className={`mt-2 text-sm text-center animate-fade-in ${
                darkMode ? 'text-green-400' : 'text-green-600'
            }`}>
                Cover image updated successfully!
            </p>
        )}
    </div>
);
}

export default EditCoverImage