
import {formatDuration,timeDifference} from '../../utils/timeDiff.js'
import { useNavigate } from 'react-router-dom';

const VideoCard = ({videos}) => {
    const navigate = useNavigate();
    const handleVideoClick = (video) => {
        console.log("Video clicked:", video);
        navigate(`/watch/${video._id}`);
      };
      console.log(videos);
      const VideoTitle = ( title ) => {
        // Function to process the title based on its length
        const formatTitle = (title) => {
          if (title.length > 30) {
            return `${title.substring(0, 30)}...`;
          }
          return title;
        };
      
        return <div>{formatTitle(title)}</div>;
      };
  return (
    
      videos.map((video) => (

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
            <div className='w-12'><img src={video.ownerDetails.avatar.url} className='rounded-full w-8 h-8'/></div>
            <div className=''>
              
              <h1 className='text-1xl font-bold font-sans text-white'>{VideoTitle(video.title)}</h1>

              <div className='flex flex-row text-white gap-1'>
              <p className=''>{video.ownerDetails.username}</p>
              <p className='mt-[-20px] text-4xl'>.</p>
              <p className=''>{timeDifference(new Date(),new Date(video.createdAt))}</p>
              </div>
            </div>

          </div>
        
        </div>
      ))

  )
}

export default VideoCard
