import axios from 'axios'
import React, { useState , useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'
import Button from './Button';
import Input from './input';
import { useNavigate } from 'react-router-dom';


function EditCoverImage() {
    const [error , seterror] = useState(false)  
   const InputFileRef = useRef(null)
   const Navigate = useNavigate() 

    const UpdateCoverImage = async() => {
   seterror('')
   const File = InputFileRef.current?.files?.[0]
    console.log(File)

   try {
    const formdata = new FormData()
    formdata.append('coverImage' , File)

   axios.patch('api/users/cover-image' , formdata , {
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

  return (
     <div>
       <div className="relative">
         <Button
           onClick={() => InputFileRef.current && InputFileRef.current.click()}
           className="absolute bottom-0 right-6 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transform translate-x-1/4 translate-y-1/4"
         >
           <FontAwesomeIcon icon={faPen} />
         </Button>
         {/* Hidden File Input */}
         <Input
           ref={InputFileRef}
           type="file"
           accept="image/*"
           className="hidden"
           onChange={() => {UpdateCoverImage()}}
         />
       </div>
       {error && <p className="text-red-500 mt-2">{error}</p>}
     </div>
  )
}

export default EditCoverImage