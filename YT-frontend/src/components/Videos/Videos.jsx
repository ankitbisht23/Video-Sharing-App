import React, { useState, useEffect,useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios.js';

import {formatDuration,timeDifference} from '../../utils/timeDiff.js'
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

  {console.log(videos[0])}
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="bg-black shadow-md rounded-lg overflow-hidden cursor-pointer h-[250px]"
          onClick={() => handleVideoClick(video)}
        >
          <div className='relative bg-white h-44'>
            <img src={video.thumbnail.url} className='object-cover h-44 w-full'/>
            <p className='text-white absolute bottom-0 right-0 bg-black p-1 m-1 rounded'>{formatDuration(video.duration)}</p>
          </div>
          <div className='flex mt-2 gap-2 ml-2'>
            <div><img src={video.ownerDetails.avatar.url} className='rounded-full w-8 h-8'/></div>
            <div className=''>
              
              <h1 className='text-1xl font-bold font-sans text-white'>{video.title}</h1>

              <div className='flex flex-row text-white gap-1'>
              <p className=''>{video.ownerDetails.username}</p>
              <p className='mt-[-20px] text-4xl'>.</p>
              <p className=''>{timeDifference(new Date(),new Date(video.createdAt))}</p>
              </div>
            </div>

          </div>
        
        </div>
      ))}
    </div>
  );
};

export default Videos;