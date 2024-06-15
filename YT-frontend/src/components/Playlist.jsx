import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios.js';

const Playlist = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const user = useSelector(state => state.auth.user);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`/playlist/user/${user._id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setPlaylists(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    };

    if (accessToken && user) {
      fetchPlaylists();
    }
  }, [accessToken, user]);

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim() === '' || newPlaylistDescription.trim() === '') return;

    try {
      await axios.post('/playlist/', {
        name: newPlaylistName,
        description: newPlaylistDescription
      }, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      // Fetch the updated playlists
      const response = await axios.get(`/playlist/user/${user._id}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setPlaylists(response.data.data);

      // Clear the input fields and close the form
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Playlists</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Playlist
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist Name"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <textarea
              value={newPlaylistDescription}
              onChange={(e) => setNewPlaylistDescription(e.target.value)}
              placeholder="Playlist Description"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              rows="3"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        {playlists.length === 0 ? (
          <div>No playlists found</div>
        ) : (
          playlists.map(playlist => (
            <div key={playlist._id} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{playlist.name}</h3>
                <p className="text-gray-600 mb-2">{playlist.description}</p>
                <p className="text-gray-600 mb-2">Total Videos: {playlist.totalVideos}</p>
                <p className="text-gray-600 mb-2">Total Views: {playlist.totalViews}</p>
                <p className="text-gray-600">Last Updated: {new Date(playlist.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlist;
