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
  const API_BASE  = import.meta.env.VITE_API_URL;




  useEffect(() => {
    UserPlaylist();
  }, []);
  
  // Updated addVideo accepts a playlistId parameter
  const addVideo = async (playlistId) => {
    try {
      await axios.post(
        `${API_BASE}/api/v1/playlist/AddVideoToPlaylist/c/${VideoId}`,
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
      const response = await axios.get(`${API_BASE}/api/v1/playlist/UserPlaylist`)
      setPlaylists(response.data.data)
      setPlaylistID(response.data.data[0]._id)

    } catch (error) {
      console.error('Error while fetching user Playlist', error)
    }

  }

  const DelVideoPlaylist = async () => {
    try {
      await axios.delete(`${API_BASE}/api/v1/playlist/remove/c/${VideoId}`, {
        data: { PlaylistId: PlaylistId },
        headers: { "Content-Type": "application/json" }
      })
      console.log("Video Removed Sucessfully")
      Navigate(0)
    } catch (error) {
      console.error("error while deleting video From playlist")
    }
  }

// this is for checking if the video exists in the playlist
  const checkVideoInPlaylist = () => {
    return playlists.some(playlist => 
      playlist.vidoes.some(video => video._id === VideoId)
    );
  };

  
 

  return (
    <div className="relative">
      {checkVideoInPlaylist() ? (
        <button 
          onClick={DelVideoPlaylist}
         className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all 
                    duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                    disabled:opacity-50 disabled:cursor-not-allowed"
        > Remove From Playlist
          </button>
      ) : (
        <button
          onClick={() => {
            setShowPlaylistModal(true)
            UserPlaylist()
          }}
         className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg 
                    hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform 
                    hover:scale-105 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 
                    disabled:cursor-not-allowed"
        >
          Add to Playlist
        </button>
      )}

      {showPlaylistModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 
                      animate-fade-in">
          <div className="bg-white rounded-xl p-6 w-96 max-w-[90%] shadow-2xl transform transition-all 
                          animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Select Playlist</h3>
              <button
                onClick={() => setShowPlaylistModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  onClick={() => addVideo(playlist._id)}
                  className="group flex items-center p-3 rounded-lg cursor-pointer transition-all
                            duration-200 hover:bg-blue-50 hover:pl-5 active:scale-[0.98]"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-300"/>
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">{playlist.name}</span>
                </div>
              ))}
            </div>

            {playlists.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No playlists found. Create one first!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddVideoToPlaylist
