import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GetuserPlaylists() {
  const [PlaylistData, setPlaylistData] = useState([])

  const UserPlaylist = async () => {
    try {
      const response = await axios.get('/api/playlist/UserPlaylist')
      console.log(response, 'User Playlist Fetched Successfully')
      setPlaylistData(response.data.data)
    } catch (error) {
      console.error('Error While fetching user Playlist')
    }
  }

  useEffect(() => {
    UserPlaylist()
  }, [])

  return (
    <div>
    <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
  
    {PlaylistData.length > 0 ? (
      <div className="flex overflow-x-auto pb-4 space-x-4">
        {PlaylistData.map((playlist) => (
          <div key={playlist._id} className="flex-shrink-0 w-80">
            {/* Playlist header */}
            <div className="mb-2">
              <h1 className="text-lg font-semibold">{playlist.name}</h1>
              <p className="text-gray-500 text-sm">{playlist.description}</p>
            </div>
  
            {/* Videos list */}
            {playlist.vidoes?.length > 0 ? (
              <div className="flex space-x-3 overflow-x-auto">
                {playlist.vidoes.map((video) => (
                  <div
                    key={video._id}
                    className="flex-shrink-0 p-1 hover:bg-gray-50 rounded transition-colors"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-32 h-20 object-cover rounded-md"
                    />
                    <div className="mt-1">
                      <h2 className="text-sm font-medium line-clamp-2">
                        {video.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-2 text-gray-400 text-sm">
                No videos in this playlist
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-gray-400">
        No playlists available
      </div>
    )}
  </div>
  )
}

export default GetuserPlaylists
