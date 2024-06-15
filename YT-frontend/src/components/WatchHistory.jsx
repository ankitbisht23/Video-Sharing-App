import React from 'react';
import { Link } from 'react-router-dom';

const WatchHistory = ({ watchHistory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {watchHistory.map((video) => (
        <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <Link to={`/watch/${video._id}`}>
            <div className="w-full aspect-video relative">
              <img
                src={video.thumbnail.url}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link to={`/watch/${video._id}`}>
              <h3 className="font-bold text-lg mb-2">{video.title}</h3>
            </Link>
            <p className="text-gray-600 mb-2">
              By {video.owner.username} • {video.views} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WatchHistory;