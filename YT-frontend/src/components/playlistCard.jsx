import React from 'react'
 const playlistCard = ({playlists}) => {
  return (
    {
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
    }
    // <div className='text-white text-5xl'>hiiii</div>
  )
}

export default playlistCard
