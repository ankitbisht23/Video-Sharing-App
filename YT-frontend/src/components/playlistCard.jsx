
import playlistImage from '../../public/play_image.jpeg'
import { useNavigate } from 'react-router-dom';
 const PlaylistCard = ({playlists}) => {
  const navigate = useNavigate();
  const handleVideoClick = (id) => {
      console.log("playlist clicked:");
      navigate(`/playlist/${id}`);
    };
  return (
    <>
        {
        playlists.map(playlist => (
            <div key={playlist._id} className="bg-black rounded-lg overflow-hidden min-h-60" onClick={()=>handleVideoClick(playlist._id)}>
              <div style={{ backgroundImage: `url(${playlist?.firstVideo?.thumbnail?.url ? playlist.firstVideo.thumbnail.url: playlistImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='h-[80%] relative hover:scale-110 duration-300 ease-in-out'>
              <p className="mb-2 text-white bg-black  inline-block absolute right-0 bottom-[-10px] scale-100">{playlist.totalVideos} Videos</p>
              </div>
              <div className="p-4 text-white">
                <h3 className="font-bold text-lg mb-2">{playlist.name}</h3>
                {/* <p className=" mb-2">{playlist.description}</p> */}
                
                {/* <p className=" mb-2">Total Views: {playlist.totalViews}</p>
                <p className="">Last Updated: {new Date(playlist.updatedAt).toLocaleString()}</p> */}
              </div>
            </div>
              
            
          ))
    }
    </>
    // <div className='text-white text-5xl'>hiiii</div>
  )
}

export  {PlaylistCard}
