import axios from 'axios'
import React, { useState } from 'react'

function EditCoverImage() {
    const [error , seterror] = useState(false)

    const UpdateCoverImage = async(data) => {
   seterror('')

   try {
    const formdata = new FormData()
    formdata.append('coverImage' , data.coverImage?.[0])
   } catch (error) {
    const errorr = error?.response?.data?.message
    seterror(errorr)
   }
   axios.post('api/users/coverImage' , formdata , {
    headers: {"Content-Type": "multipart/form-data"}
   })
   if (response.data.coverImage) {
    console.log("avatar updated sucessfully")
   }
    }
  return (
    <div>EditCoverImage</div>
  )
}

export default EditCoverImage