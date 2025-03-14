import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Input from '../input'

function Addcomment() {
    const {VideoId} = useParams()
      const [CommentContent , SetCommentContent] = useState("")
      const [message , setMessage] = useState("")
     

      
     const handleComSubmit = async (e) => {
      SetCommentContent(e.target.value)
     }

    const AddComment = async () => {
        console.log("VideoId:", VideoId);
        
        
        try {
          await axios.post(`/api/comments/Add/c/${VideoId} ` ,   
             {Content: CommentContent}
            , {
              headers: {
                'Content-Type': 'application/json',
               
              }
            }
          );
          setTimeout(() => {
            setMessage("Commentted added sucessfully on this video!")
          }, 2000);
        } catch (error) {
          console.error("Error in AddComment:", error);
        }
      }

  return (

       <div className="flex items-center space-x-3 mb-4">
      {/* <div className="w-10 h-10 bg-gray-300 rounded-full"></div> */}
      <Input type="text" placeholder="Add a comment..." className="flex-grow p-2 border border-gray-300 rounded-lg"
      onChange = {handleComSubmit} 
      value = {CommentContent}
      />
         <button onClick={AddComment}>Add Commment</button>
         {message && (
          <p> Comment added sucessfully on this video! </p>
         )}
    </div>
 
  )
}

export default Addcomment