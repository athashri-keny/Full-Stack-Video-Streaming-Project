import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams , Navigate, useNavigate } from 'react-router-dom'

function EditComments() {
const [EditedComment , setEditedComment] = useState("")
const {CommentId , VideoId} = useParams()
const Navigate = useNavigate()

const EditComm = async () => {
    const response = await axios.patch(`/api/comments/update/c/${VideoId}/c/${CommentId}`,
        {UpdatedComment: EditedComment}
    
    )
    console.log("Comment Edited Sucessfully!!!!!!!!!!!!!!" , response)
}

const HandleSumbit = (e) => {
  setEditedComment(e.target.value)
}
  return (
    <div>
   <input type='text'
   placeholder='enter your Comment'
   className="flex-grow p-2 border border-gray-300 rounded-lg"
   onChange={HandleSumbit}
   value={EditedComment}
   >
   </input>
   <button onClick={EditComm}>Submit</button>
    </div>
  )
}

export default EditComments