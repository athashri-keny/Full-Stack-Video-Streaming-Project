import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import SideNav from '../SideNav/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons';

function GetUserPlaylists() {
   const [playlists, setPlaylists] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
 const { register, handleSubmit, reset } = useForm();
 const darkMode = useSelector((state) => state.theme.DarkMode)

 
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
      <SideNav/>
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
  <div className="ml-48 mt-16 p-6 transition-colors duration-300">
    <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      Your Playlists
      <FontAwesomeIcon icon= {faList}  className='pl-2.5'/>
      
    </h2>
    
    {playlists.length > 0 ? (
      <div className="flex overflow-x-auto pb-4 space-x-6">
        {playlists.map((playlist) => (
          <div 
            key={playlist._id} 
            className={`flex-shrink-0 w-96 p-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="mb-4">
              <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {playlist.name}
              </h1>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {playlist.description}
              </p>
            </div>

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
              <div className={`py-3 text-center text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                No videos in this playlist
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className={`text-center py-8 text-lg ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        No playlists available. Create one!
      </div>
    )}

    <div className="mt-6">
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
          darkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-gray-100' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Create Playlist
      </button>
    </div>

    {isCreateModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className={`rounded-xl p-6 w-96 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            New Playlist
          </h3>
          <form onSubmit={handleSubmit(onCreatePlaylist)}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Playlist Name"
                className={`w-full p-2.5 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'border-gray-300 text-gray-900'
                }`}
                {...register('name')}
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Description"
                className={`w-full p-2.5 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'border-gray-300 text-gray-900'
                }`}
                {...register('description')}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className={`px-5 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-gray-600 hover:bg-gray-700 text-gray-100' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-green-600 hover:bg-green-700 text-gray-100' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
</div>
</div>
  );
}

export default GetUserPlaylists;
