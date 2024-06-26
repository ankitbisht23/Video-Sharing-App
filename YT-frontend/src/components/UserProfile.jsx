import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import VideoUploadForm from './VideoUploadForm';
import SubscribedChannels from './SubscribedChannels';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import VideoCard from './Videos/VideoCard'
import {VideoTitle,formatDuration} from '../utils/timeDiff.js'
const UserProfile = () => {
  const accessToken = useSelector(state => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState('Videos');
  const [userVideos, setUserVideos] = useState([]);
  const [stats,setStats]=useState();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const navItems = [
    {
      name: 'Videos',
    }, 
  {
      name: "Subscriptions",
  },
  {
      name: "Dashboard",
  },
  ]
  const handleSubscribeToggle = async () => {
    try {
      const response = await axios.post(`/subscriptions/c/${stats?._id}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setStats((prevVideo) => ({
        ...prevVideo,
          isSubscribed: !prevVideo.isSubscribed,
          subcribersCount: !prevVideo.isSubscribed ? prevVideo.subcribersCount + 1 : prevVideo.subcribersCount - 1
        
      }));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };
  
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get('/dashboard/videos', {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setUserVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching user videos:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get(`/users/c/${user.username}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    if (user) {
      fetchUserVideos();
      fetchStats();
    }
  }, [user]); // Add user as a dependency

  useEffect(() => {
    if (stats) {
      console.log('Stats:', stats);
    }
  }, [stats]);

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
    <div className=''>
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${user?.coverImage?.url})`,
          height: '300px',
        }}
      ></div>
      <div className='text-white flex justify-between'>
       
        {/* <h1>{stats?.username}</h1>
        <h1>{stats?.avatar?.url}</h1>
        <h1>{stats?.subcribersCount}</h1>
        <h1>{stats?.isSubscribed}</h1> */}
        <div className=' flex flex-row gap-4'>
        <div className=''><img src={stats?.avatar?.url} className='rounded-full w-28 h-28'/></div>
        <div>
          <h1 className='text-5xl font-semibold'>{stats?.username}</h1>
          <div className='flex flex-row gap-2'>
          <h1 className='text-0.5xl'>{stats?.email}</h1>
          <h1 className='text-0.5xl'>• {stats?.subcribersCount} Subscribers</h1>
          <h1 className='text-0.5xl'>• {userVideos.length} Videos</h1>
          
          </div>
          <button
              onClick={handleSubscribeToggle}
              className={`rounded-2xl mt-2 px-4 py-2 ease-in-out duration-300 ${stats?.isSubscribed ? 'bg-gray-500' : 'bg-red-500'} text-white rounded hover:${stats?.isSubscribed ? 'bg-gray-600' : 'bg-red-600'}`}
            >
              <FaBell className="inline-block mr-2" />
              {stats?.isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>

        </div>
        </div>

        <div className='mr-8 mt-9 '><button className='text-white hover:bg-violet-500 duration-300 ease-in-out rounded-lg p-2'>Edit Profile</button></div>
       
      </div>

      <div className="flex justify-center mt-4  border-b">
        {/* <button
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
        </button> */}
        <ul className='flex ml-auto'>
            {navItems.map((item) => 
                          <li key={item.name}>
                <button
                onClick={() =>  handleTabChange(item.name)}
                className='inline-bock font-semibold text-white px-6 py-2 duration-200 hover:bg-violet-600 rounded-full mb-2'
                >{item.name}</button>
              </li>
           
            )}
           
          </ul>

      </div>

      {activeTab === 'Videos' && (
        <div className="mt-4">
          <button
            className="bg-violet-600 text-white px-4 py-2 rounded"
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
      {/* {userVideos.map((video) => (
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
      ))} */}
      {console.log(userVideos,'uservideo')}
      <VideoCard videos={userVideos}/>
    </div>


          </div>
        </div>
      )}

      {activeTab === 'Subscriptions' && (
        <div className="mt-4">
          <SubscribedChannels userId={user._id} />
        </div>
      )}

      {activeTab === 'Dashboard' && (
        <div className="mt-4 text-white min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          {console.log(userVideos,'userVideos')}
          {userVideos.map((video) => (
            <div key={video._id} className="mb-8">
              {/* <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p>Likes: {video.likesCount}</p> */}
              <div className="flex flex-col gap-4 w-full h-56">
                  
                    <div key={video._id} className="bg-black shadow-md rounded-lg overflow-hidden flex flex-row gap-2">
                      <Link to={`/watch/${video._id}`}>
                        <div className="w-96 aspect-video relative hover:scale-110 ease-in-out duration-300 hover:rounded-lg">
                          <img
                            src={video.thumbnail.url}
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                          />
                          <p className='text-white absolute bottom-0 right-0 bg-black p-1 m-1 rounded'>{formatDuration(video.duration)}</p>
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link to={`/watch/${video._id}`}>
                          <h3 className=" text-white font-bold text-lg mb-2">{video.title}</h3>
                        </Link>
                        <p className="text-white mb-2">
                        • {video.views} views
                        </p>
                        <div className='w-18'><p className='text-white text-left text-0.5xl '>{VideoTitle(video.description,100)}</p></div>
                      </div>
                    </div>
                  
                </div>
              <div>
                <button className="hover:bg-violet-500 duration-300 ease-in-out text-white px-4 py-2 rounded mr-2">
                  Edit
                </button>
                <button className="hover:bg-violet-500 duration-300 ease-in-out text-white px-4 py-2 rounded mr-2">
                  Delete
                </button>
                <button className="hover:bg-violet-500 duration-300 ease-in-out text-white px-4 py-2 rounded">
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