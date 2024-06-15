import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios.js';

const Videos = () => {
  console.log("Videos component rendered");
  const [videos, setVideos] = useState([]);
  const accessToken = useSelector(state => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Fetching videos...");
        const response = await axios.get('/video', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        //console.log("API Response:", response.data.data);
        const data = response.data.data.docs;

        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    if (accessToken) {
      console.log("Access token available, fetching videos");
      fetchVideos();
    } else {
      console.log("No access token, skipping video fetch");
    }
  }, [accessToken]);

  const handleVideoClick = (video) => {
    console.log("Video clicked:", video);
    navigate(`/watch/${video._id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          onClick={() => handleVideoClick(video)}
        >
          <div className="w-full aspect-video relative">
            <img
              src={video.thumbnail.url}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{video.title}</h3>
            <p className="text-gray-600 mb-2">
              By {video.ownerDetails.username} • {video.views} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;