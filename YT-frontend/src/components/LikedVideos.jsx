import React from 'react';
import { Link } from 'react-router-dom';

const LikedVideos = ({ likedVideos }) => {
  if (!likedVideos) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Liked Videos</h2>
        <div>
          <p>No liked videos found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Liked Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedVideos.map((likedVideo) => (
          <div key={likedVideo.likedVideo._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/watch/${likedVideo.likedVideo._id}`}>
              <div className="w-full aspect-video relative">
                <img
                  src={likedVideo.likedVideo.thumbnail.url}
                  alt={likedVideo.likedVideo.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/watch/${likedVideo.likedVideo._id}`}>
                <h3 className="font-bold text-lg mb-2">{likedVideo.likedVideo.title}</h3>
              </Link>
              <p className="text-gray-600 mb-2">
                By {likedVideo.likedVideo.ownerDetails.username} • {likedVideo.likedVideo.views} views
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedVideos;
