import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function CreatePlaylist() {
const {register , handleSubmit} = useForm()

    const playlist = async () => {

        try {
            const data = {
                name: Name,
                description: description
            }
            const response = await axios.post('/api/playlist/CreatePlaylist' , data , {
                headers: {"Content-Type" : 'application/json'}
            })
            console.log( "Playlist Created Sucessfully" , response)
        } catch (error) {
            console.error("error while creating the playlist")
        }
    }


  return (
    <div>
        <button onClick={playlist}> Create Playlist</button>
        <form onSubmit={handleSubmit(CreatePlaylist)}>
        <div>
            <input
            type='text'
            id='text'
            placeholder='enter your Playlist Name' 
            {...register('text') , {required: true}}
            >
            </input>
            <input
            type='text'
            id='text'
            placeholder='enter your playlist description'
            {...register('text') , {required: true}}
            >
            </input>
        </div>
        </form>
    </div>
  )
}

export default CreatePlaylist