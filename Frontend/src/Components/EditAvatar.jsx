import React, { useState } from 'react'
import axios from 'axios'



function EditAvatar() {
const [error , seterror] = useState(false)

const UpdateAvatar = async (data) => {
    seterror('')
    
    try {
        const formdata = new FormData();
        formdata.append( 'avatar', data.avatar?.[0])
        
    } catch (error) {
        const errorMsg = error.response?.data?.message
        seterror(errorMsg)
    }
       axios.post('api/users/avatar' , formdata , {
        headers: {"Content-Type": "multipart/form-data"}
       })
       if (response.data.avatar) {
        console.log("avatar updated sucessfully")
       }
}


  return (
    <div>EditAvatar</div>
  )
}

export default EditAvatar