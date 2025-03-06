import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';


function GetUserPlaylists() {
   const [playlists, setPlaylists] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 const { register, handleSubmit, reset } = useForm();

  const fetchUserPlaylists = async () => {
    try {
      const response = await axios.get('/api/playlist/UserPlaylist');
      console.log(response, 'User Playlist Fetched Successfully');
      setPlaylists(response.data.data);
    } catch (error) {
      console.error('Error while fetching user playlists', error);
    }
  };

  useEffect(() => {
    fetchUserPlaylists();
  }, []);


  const onCreatePlaylist = async (data) => {
    try {
      const response = await axios.post(
        '/api/playlist/CreatePlaylist',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Playlist Created Successfully', response);
      fetchUserPlaylists()
      setIsCreateModalOpen(false)
      reset(); 
    } catch (error) {
      console.error('Error while creating the playlist', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
      {playlists.length > 0 ? (
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="flex-shrink-0 w-80">
              {/* Playlist header */}
              <div className="mb-2">
                <h1 className="text-lg font-semibold">{playlist.name}</h1>
                <p className="text-gray-500 text-sm">{playlist.description}</p>
              </div>
              {/* Videos list */}
              {playlist.vidoes && playlist.vidoes.length > 0 ? (
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
          No playlists available. Create one!
        </div>
      )}

      {/* Button to open the Create Playlist modal */}
      <div className="mt-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Create Playlist
        </button>
      </div>

      {/* Create Playlist Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Create a New Playlist</h3>
            <form onSubmit={handleSubmit(onCreatePlaylist)}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your Playlist Name"
                  {...register('name')}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="description"
                  placeholder="Enter your playlist description"
                  className="w-full border border-gray-300 rounded p-2"
                  {...register('description')}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetUserPlaylists;
