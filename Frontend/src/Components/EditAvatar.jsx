import React, { useRef, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import Input from './input'
 

function EditAvatar() {
const [error , seterror] = useState(false)
const [avatarUpdated , setavatarUpdated] = useState(false)

const FileInputRef = useRef(null)

const updateAvatar = async () => {
  // Clear any previous errors
  seterror('');

  // Get the file from the file input
  const File = FileInputRef.current?.files?.[0]
  console.log(File)
  
  if (!File) {
    console.error("Avatar file is missing");
    seterror("Avatar is required");
    return;
  }
  setavatarUpdated(!avatarUpdated)
 
  // Create a FormData object and append the file
  const formdata = new FormData();
  formdata.append('avatar', File);
  
  try {
    const response = await axios.patch("/api/users/avatar", formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    // Check if the response contains the updated avatar
    if (response.data.avatar) {
      console.log("Avatar updated successfully");
       // reload the page to show changes
      // Optionally, update state or do further processing here
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Error uploading avatar";
    console.error(errorMsg);
    seterror(errorMsg);
  }
};

// refs are used to  programmatically trigger the hidden file  input click event
return (
  <div>
    <div className="relative">
      <Button
        onClick={() => FileInputRef.current && FileInputRef.current.click()}
        className="absolute bottom-0 right-6 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transform translate-x-1/4 translate-y-1/4"
      >
        <FontAwesomeIcon icon={faPen} />
      </Button>
      {/* Hidden File Input */}
      <Input
        ref={FileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={() => {updateAvatar()}}
      />
    </div>
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </div>
);
}

export default EditAvatar



// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen } from '@fortawesome/free-solid-svg-icons';

// function EditAvatar() {
//   const [error, setError] = useState('');
//   const fileInputRef = useRef(null);

//   const updateAvatar = async () => {
//     setError(''); // Clear previous errors

//     // Get the file from the file input ref

//     const file = fileInputRef.current?.files?.[0];
//     console.log('Selected file:', file);

//     if (!file) {
//       setError('Avatar is required');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('avatar', file);

//     try {
//       // Use axios.patch instead of patchForm and omit Content-Type header
//       const response = await axios.patch('/api/users/avatar', formData);
      
//       if (response.data.avatar) {
//         console.log('Avatar updated successfully:', response.data.avatar);
//         // Optionally update the UI here
//       }
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Error uploading avatar';
//       setError(errorMsg);
//       console.error('Upload error:', errorMsg);
//     }
//   };

//   return (
//     <div>
//       <div className="relative">
//         <button
//           onClick={() => fileInputRef.current?.click()}
//           className="absolute bottom-0 right-6 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transform translate-x-1/4 translate-y-1/4"
//         >
//           <FontAwesomeIcon icon={faPen} />
//         </button>
//         {/* Hidden File Input */}
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={updateAvatar} // Directly trigger updateAvatar on file selection
//         />
//       </div>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }

// export default EditAvatar;