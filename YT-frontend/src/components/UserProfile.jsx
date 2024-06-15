import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import VideoUploadForm from './VideoUploadForm';
import SubscribedChannels from './SubscribedChannels';
import { Link } from 'react-router-dom';
const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState('videos');
  const [userVideos, setUserVideos] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get('/dashboard/videos', {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setUserVideos(response.data.data);
        console.log("user is",user)
        console.log("videos", response.data.data)
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    fetchUserVideos();
  }, [user.accessToken]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUploadVideo = () => {
    setShowUploadForm(true);
  };

  const handleCloseUploadForm = () => {
    setShowUploadForm(false);
  };

  return (
    <div>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${user.coverImage.url})`,
          height: '300px',
        }}
      ></div>

      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mr-4 ${
            activeTab === 'videos'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('videos')}
        >
          Videos
        </button>
        <button
          className={`px-4 py-2 mr-4 ${
            activeTab === 'subscriptions'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('subscriptions')}
        >
          Subscribed Channels
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'dashboard'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleTabChange('dashboard')}
        >
          Dashboard
        </button>
      </div>

      {activeTab === 'videos' && (
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUploadVideo}
          >
            Upload Video
          </button>
          {showUploadForm && (
            <VideoUploadForm onClose={handleCloseUploadForm} />
          )}
          <div className="mt-4">
            {/* {userVideos.map((video) => (
              <div key={video._id} className="mb-4">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <p>Likes: {video.likesCount}</p>
              </div>
            ))} */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userVideos.map((video) => (
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
               {video.views} views
            </p>
          </div>
        </div>
      ))}
    </div>


          </div>
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div className="mt-4">
          <SubscribedChannels userId={user._id} />
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          {userVideos.map((video) => (
            <div key={video._id} className="mb-4">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p>Likes: {video.likesCount}</p>
              <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                  Delete
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  {video.isPublished ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;