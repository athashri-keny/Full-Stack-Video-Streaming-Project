import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { data, useParams , useNavigate } from 'react-router-dom'
import Button from '../Button'

function AddVideoToPlaylist() {
  const Navigate = useNavigate()
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const { VideoId } = useParams() // Ensure your route is providing this parameter
  const [playlists, setPlaylists] = useState([])
  const [PlaylistId , setPlaylistID] = useState("")



  useEffect(() => {
    UserPlaylist();
  }, []);
  
  // Updated addVideo accepts a playlistId parameter
  const addVideo = async (playlistId) => {
    try {
      const response = await axios.post(
        `/api/playlist/AddVideoToPlaylist/c/${VideoId}`,
        { PlaylistId: playlistId },
        { headers: { "Content-Type": "application/json" } }
      )
      console.log( "Video Added Successfully to Playlist!")
      Navigate(0)
    } catch (error) {
      console.error("Failed to add Video to Playlist", error)
    }
  }
 

  const UserPlaylist = async () => {
    try {
      const response = await axios.get('/api/playlist/UserPlaylist')
      console.log( 'User Playlist Fetched Successfully')
      setPlaylists(response.data.data)
      setPlaylistID(response.data.data[0]._id)

    } catch (error) {
      console.error('Error while fetching user Playlist', error)
    }

  }

  const DelVideoPlaylist = async () => {
    try {
      await axios.delete(`/api/playlist/remove/c/${VideoId}`, {
        data: { PlaylistId: PlaylistId },
        headers: { "Content-Type": "application/json" }
      })
      console.log("Video Removed Sucessfully")
      Navigate(0)

    } catch (error) {
      console.error("error while deleting video From playlist")
    }
  }




  const checkVideoInPlaylist = () => {
    return playlists.some(playlist => 
      playlist.vidoes.some(video => video._id === VideoId)
    );
  };

 

  return (
    <div>
      {checkVideoInPlaylist() ? (
        <div>
        <button className='px-4 py-2 bg-red-400 text-white rounded hover:bg-red-700 transition' onClick={() => {DelVideoPlaylist(PlaylistId)}} > Remove Video From Playlist </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowPlaylistModal(true)
            UserPlaylist()
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add this Video to a Playlist
        </button>
      )}

      {showPlaylistModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg transform transition duration-300 ease-in-out animate__animated animate__fadeInDown">
            <h3 className="text-xl font-semibold mb-4">Select Playlist</h3>
            <div>
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => addVideo(playlist._id)}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  {playlist.name}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPlaylistModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddVideoToPlaylist
