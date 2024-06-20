import React from 'react';
import { Link } from 'react-router-dom';
import {VideoTitle,formatDuration} from '../utils/timeDiff.js'
import { useSelector } from 'react-redux';
import axios from '../axios.js';
import { MdOutlineDeleteOutline } from "react-icons/md";
import {FaTrash} from 'react-icons/fa';
const PlaylistList = ({videos}) => {
    const accessToken = useSelector(state => state.auth.accessToken);
    {console.log('PlayLIst')}
    console.log(videos,'videos')
  if (!videos) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-2xl font-bold mb-4">Liked Videos</h2> */}
        <div>
          <p>No videos found.</p>
        </div>
      </div>
    );
  }
  const  removeFromPlaylist=async(id)=>{

    try {
        
        const removerVideo = await axios.patch(`/playlist/remove/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
      } catch (error) {
        console.error('Error fetching video data:', error);
        setLoading(false);
      }
  }     

  return (
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* <h2 className="text-2xl font-bold mb-4">Liked Videos</h2> */}
      <div className="flex flex-col gap-4 w-full h-[1500px]">
        {videos.map((video) => (
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
            <Link to={``}>
              <div className="mt-5">
                <img
                  src={video.ownerDetails.avatar.url}
                  // alt={video.title}
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/watch/${video._id}`}>
                <h3 className=" text-white font-bold text-lg mb-2">{video.title}</h3>
              </Link>
              <p className="text-white mb-2">
                By {video.ownerDetails.username} • {video.views} views
              </p>
              <div className='w-18'><p className='text-white text-left text-0.5xl '>{VideoTitle(video.description,100)}</p></div>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
